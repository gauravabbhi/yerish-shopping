import React from 'react';
import {Button} from "@material-ui/core";
import className from 'classnames';
import {Mutation} from "react-apollo";
import gql from 'graphql-tag';
import {CURRENT_USER_QUERY} from "./User";

const ADD_TO_CART_MUTATION = gql`
    mutation addToCart($id:ID!){
        addToCart(id:$id){
            id
            quantity
        }
    }
`;

const AddToCart = ({classes, id}) => {
    return (
        <Mutation mutation={ADD_TO_CART_MUTATION} variables={{id}} refetchQueries={[{query: CURRENT_USER_QUERY}]}>
            {(addToCart, {loading}) => (
                <Button size="small"
                        className={classes.cart}
                        onClick={addToCart}
                        disabled={loading}
                >
                    Add{loading && 'ing'} To Cart
                </Button>
            )}
        </Mutation>

    );
};

export default AddToCart;
