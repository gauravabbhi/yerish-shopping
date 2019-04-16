import React from 'react';
import {Mutation} from "react-apollo";
import gql from 'graphql-tag';
import Delete from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import {CURRENT_USER_QUERY} from "../User";

const REMOVE_FROM_CART_MUTATION = gql`
    mutation removeFromCart($id:ID!) {
        removeFromCart(id:$id){
            id
        }
    }
`;

const RemoveFromCart = ({id}) => {
    const update = (cache, payload) => {
        // 1. Read the cache
        const data = cache.readQuery({
            query: CURRENT_USER_QUERY
        });
        // 2. Remove that item from the cart
        const cartItemId = payload.data.removeFromCart.id;
        data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
        // 3. write it back to the cache
        cache.writeQuery({query: CURRENT_USER_QUERY, data});
    };

    return (
        <Mutation
            mutation={REMOVE_FROM_CART_MUTATION}
            variables={{id}}
            update={update}
            optimisticResponse={{
                __typename: 'Mutation',
                removeFromCart: {
                    __typename: 'CartItem',
                    id
                }
            }}>
            {(removeFromCart, {loading, error}) =>
                <IconButton aria-label="Delete" onClick={removeFromCart} disabled={loading}>
                    <Delete/>
                </IconButton>
            }
        </Mutation>
    );
};

export default RemoveFromCart;
