const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {randomBytes} = require('crypto');
const {promisify} = require('util');
const {transport, makeANiceEmail} = require('../mail');
const {hasPermission} = require('../utils');

const generateToken = (user) => {
    return jwt.sign({userId: user.id}, process.env.APP_SECRET);
};

const generateJwtTokenCookie = (ctx, token) => {
    ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 //1 year cookie
    });
};

const Mutations = {
    async createItem(parent, args, ctx, info) {
        if (!ctx.request.userId) {
            throw new Error('You must be logged in to do that!');
        }

        return await ctx.db.mutation.createItem({
            data: {
                //This is how to create relationship between the item and the user
                user: {
                    connect: {
                        id: ctx.request.userId,
                    }
                },
                ...args
            }
        }, info);
    },
    updateItem(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = {...args};
        //    remove the id from updates
        delete updates.id;
        //     run the update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info);
    },
    async deleteItem(parent, args, ctx, info) {
        const {id} = args;
        const where = {id};
        //  1. find the item
        const item = await ctx.db.query.item({where}, `{id name user{id}}`);

        //  2. check if they own that item or have the permissions
        const ownItem = ctx.request.userId === item.user.id;
        const hasPermission = ctx.request.user.permission.some(permission => ['ADMIN', 'ITEMDELETE'].includes(permission));

        if (!ownItem && !hasPermission) {
            throw new Error("You don't have permission to do that!");
        }
        //  3. delete it
        return ctx.db.mutation.deleteItem({where}, info);
    },
    async signup(parent, args, ctx, info) {
        let {email, password} = args;
        //lowercase their email
        args.email = args.email.toLowerCase();
        //hash their password
        password = await bcrypt.hash(password, 10);
        //create use in the database
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permission: {set: ['USER']},
            }
        }, info);
        //create the JWT token for them
        const token = generateToken(user);
        //    We set the JWT cookie as a cookie on the response
        generateJwtTokenCookie(ctx, token);
        //    Finally we return the user to the browser
        return user;
    },
    async signin(parent, args, ctx, info) {
        let {email, password} = args;
        //lowercase their email
        email = email.toLowerCase();
        //  1. check if user exist with that email
        const user = await ctx.db.query.user({where: {email}});
        if (!user) {
            throw new Error(`No such user found for email ${email}`);
        }
        //  2. check if password is correct
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid Password');
        }
        //  3. generate JWT token
        const token = generateToken(user);
        //  4 set the cookie with the token
        generateJwtTokenCookie(ctx, token);
        //  5.return the user
        return user;
    },
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return {message: 'Goodbye!'};
    },
    async requestReset(parent, args, ctx, info) {
        let {email} = args;
        //lowercase their email
        email = email.toLowerCase();
        //    1. Check if this is a real user
        const user = await ctx.db.query.user({where: {email}});
        if (!user) {
            throw new Error(`No such user found for email ${email}`);
        }
        //    2. Set a reset token and expiry on that user
        const randomBytesPromiseified = promisify(randomBytes);
        const resetToken = (await randomBytesPromiseified(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 1000 * 60 * 60; // 1 hour from now
        const res = await ctx.db.mutation.updateUser({
            where: {email},
            data: {resetToken, resetTokenExpiry}
        });
        //    3. Email Them that reset token
        const mailRes = await transport.sendMail({
            from: process.env.MAIL_FROM,
            to: user.email,
            subject: 'Your password Reset token',
            html: makeANiceEmail(`Your password token is here! 
            \n\n 
            <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to reset</a>`)

        });
        //    4. Return the message
        return {message: `Link send to ${email}`};


    },
    async resetPassword(parent, args, ctx, info) {
        let {password, confirmPassword, resetToken} = args;
        //    1.check if the passwords match
        if (password !== confirmPassword) {
            throw new Error("Password not matched")
        }
        //    2. check if its a legit reset token
        //    3. check if its expired
        const [user] = await ctx.db.query.users({
            where: {
                resetToken,
                resetTokenExpiry_gte: Date.now() - 1000 * 60 * 60
            }
        });
        if (!user) {
            throw new Error('This token is either expired or invalid');
        }
        //    4. hash there password
        password = await bcrypt.hash(password, 10);
        //    5. save there new password
        const updatedUser = await ctx.db.mutation.updateUser({
            where: {email: user.email},
            data: {
                password,
                resetToken: null,
                resetTokenExpiry: null,
            }
        });
        //    6. Generate JWT
        const token = generateToken(user);
        //    7. Set the jwt cookie
        generateJwtTokenCookie(ctx, token);
        //    8. return the new user
        return user;
    },
    async updatePermissions(parent, args, ctx, info) {
        //Check if they are logged in
        if (!ctx.request.userId) {
            throw new Error('You must be logged in!');
        }
        //Check if they have right permission to do so
        const currentUser = await ctx.db.query.user(
            {
                where: {
                    id: ctx.request.userId,
                },
            },
            info
        );

        hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
        //update the permissions
        return ctx.db.mutation.updateUser({
            data: {
                permission: {
                    set: args.permissions
                }
            },
            where: {
                id: args.userId
            },
        }, info);
    },

    async addToCart(parent, args, ctx, info) {
        // 1. Make sure they are signed in
        const {userId} = ctx.request;
        if (!userId) {
            throw new Error('You must be signed in soon');
        }
        // 2. Query the users current cart
        const [existingCartItem] = await ctx.db.query.cartItems({
            where: {
                user: {id: userId},
                item: {id: args.id},
            }
        });
        // 3. check if that item is already in their cart and increment by 1 if it is
        if (existingCartItem) {
            console.log('This item is already in the cart');
            return ctx.db.mutation.updateCartItem({
                where: {id: existingCartItem.id},
                data: {quantity: existingCartItem.quantity + 1}
            }, info)
        }
        // 4. if it's not, create a fresh cartItem for that user!
        return ctx.db.mutation.createCartItem({
            data: {
                user: {
                    connect: {id: userId},
                },
                item: {
                    connect: {id: args.id},
                }
            }
        }, info)
    },
    async removeFromCart(parent, args, ctx, info) {
        // 1. Find the cart item
        const cartItem = await ctx.db.query.cartItem({
            where: {
                id: args.id
            },
        }, `{id, user {id}}`);

        // 2. Make sure we found an item
        if (!cartItem) throw new Error('No cart item found!');

        // 3. make sure they own that cart item
        if (cartItem.user.id !== ctx.request.userId) throw new Error('You don\'t own this item');

        // 4. Delete that cart item
        return ctx.db.mutation.deleteCartItem({
            where: {id: args.id},
        }, info);

    }
};

module.exports = Mutations;
