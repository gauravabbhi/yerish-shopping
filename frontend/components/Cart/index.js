import React, {Component} from 'react';
import {Query, Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {adopt} from "react-adopt";
import {Divider, Grid, Drawer, Typography, withStyles} from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Close from '@material-ui/icons/Close';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Black from "../Buttons/Black";
import User from "../User";
import calcTotalPrice from '../../lib/calcTotalPrice';
import CartItem from "./CartItem";


export const LOCAL_STATE_QUERY = gql`
    query {
        cartOpen @client
    }
`;

export const TOGGLE_CART_MUTATION = gql`
    mutation {
        toggleCart @client
    }
`;


const Composed = adopt({
    user: ({render}) => <User>{render}</User>,
    toggleCart: ({render}) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
    localState: ({render}) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});

const styles = theme => ({
    list: {
        padding: theme.spacing.unit * 2,
        [theme.breakpoints.up('xs')]: {
            width: 300,
        },
        [theme.breakpoints.up('md')]: {
            width: 500,
        },
    },
    typography: {
        ...theme.decorativeFont,
    },
    image: {
        height: "auto",
        width: 100
    }
});

class Cart extends Component {
    render() {
        const {classes} = this.props;

        const items = (toggleCart, {name, cart}) => (
            <div className={classes.list}>
                <List>
                    <ListItem>
                        <Grid container justify="space-between" alignItems="center">
                            <Grid item>
                                <Typography className={classes.typography} variant="h4">
                                    {name.toUpperCase()} CART
                                </Typography>
                            </Grid>
                            <Grid item>
                                <IconButton color="inherit" aria-haspopup="true" onClick={toggleCart}>
                                    <Close/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Typography>
                            You have {cart.length} product{cart.length === 1 ? '' : 's'} in your cart
                        </Typography>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    {cart.map(cart => <CartItem classes={classes} key={cart.id} cart={cart}/>)}
                    <Divider/>
                    <ListItem>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Typography className={classes.typography} variant="h6">Subtotal:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.typography}
                                            variant="h6">${calcTotalPrice(cart)}</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem>
                        <Black> Checkout </Black>
                    </ListItem>
                    <ListItem>
                        <Grid container justify="center">
                            <Grid item>
                                <Typography> Go To Cart </Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </div>
        );

        const empty = (toggleCart) => (
            <div className={classes.list}>
                <List>
                    <ListItem>
                        <Grid container justify="flex-end" alignItems="center">
                            <Grid item>
                                <IconButton color="inherit" aria-haspopup="true" onClick={toggleCart}>
                                    <Close/>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider/>
                    <ListItem style={{height: '70vh'}} alignItems="center">
                        <Grid container justify="center" alignContent="center">
                            <Grid item>
                                <Typography className={classes.typography} variant="h4" align="center">
                                    YOUR CART IS CURRENTLY EMPTY!
                                </Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
            </div>
        );

        return (
            <Composed>
                {({user, toggleCart, localState}) => {
                    const {me} = user.data;
                    const {data} = localState;
                    if (!me) return null;
                    return (
                        <>
                            <IconButton color="inherit" aria-haspopup="true" onClick={toggleCart}>
                                <Badge
                                    badgeContent={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}
                                    color="secondary">
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                            <Drawer anchor="right" open={data.cartOpen}
                                    onClose={toggleCart}
                            >
                                <div tabIndex={0} role="button">
                                    {me.cart.length > 0 ? items(toggleCart, me) : empty(toggleCart)}
                                </div>
                            </Drawer>
                        </>

                    );
                }}
            </Composed>
        );
    }
}

export default withStyles(styles)(Cart);
