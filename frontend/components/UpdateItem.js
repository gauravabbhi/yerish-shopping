// TODO implement upload multiple files
//TODO delete images from cloudinary
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, withStyles} from '@material-ui/core';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';
import GraphqlError from "./GraphqlErrorMessage";
import {ALL_ITEMS_QUERY} from './Items'
import Loading from "./Loading";

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!){
        item (where: {id: $id}){
            id
            name
            price
            description
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
    ) {
        updateItem(
            id: $id,
            name: $name,
            description: $description,
            price: $price
        ){
            id
            name
            description
            price
        }
    }
`;

const DELETE_ITEM_MUTATION = gql`
    mutation DELETE_ITEM_MUTATION($id: ID!){
        deleteItem(id: $id){
            id
        }
    }
`;

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '50vw'
    },
    dense: {
        marginTop: 16,
    },
    browse: {
        display: 'none',
    },
    button: {
        margin: theme.spacing.unit,
        width: '50vw'
    }
});


class UpdateItem extends Component {
    state = {};

    handleChange = e => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    };

    updateItem = async (e, updateItem) => {
        //Stop the form from submitting
        e.preventDefault();
        //Call the mutation
        const res = await updateItem({
            variables: {
                id: this.props.id,
                ...this.state,
            }

        });
        console.log(res);
        // Return the page
        Router.push({
            pathname: '/product',
            query: {id: res.data.updateItem.id}
        })
    };

    render() {
        let {classes, id} = this.props;
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id}}>
                {({data, loading}) => {
                    if (loading) return <Loading/>;
                    if (!data.item) return <p> No Item Found </p>;
                    return (
                        <Mutation
                            mutation={UPDATE_ITEM_MUTATION}
                            variables={this.state}

                        >
                            {(updateItem, {loading, error}) => (
                                <form className={classes.container} onSubmit={
                                    e => this.updateItem(e, updateItem)
                                }
                                >
                                    <GraphqlError error={error}/>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Name"
                                        className={classes.textField}
                                        defaultValue={data.item.name}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={e => this.handleChange(e)}
                                        disabled={loading}
                                        required
                                    />
                                    <TextField
                                        id="description"
                                        name="description"
                                        label="Description"
                                        className={classes.textField}
                                        defaultValue={data.item.description}
                                        margin="normal"
                                        variant="outlined"
                                        multiline
                                        rows="4"
                                        onChange={e => this.handleChange(e)}
                                        disabled={loading}
                                        required
                                    />
                                    <TextField
                                        id="price"
                                        name="price"
                                        type="number"
                                        label="Price"
                                        className={classes.textField}
                                        defaultValue={data.item.price}
                                        margin="normal"
                                        variant="outlined"
                                        onChange={e => this.handleChange(e)}
                                        disabled={loading}
                                        required
                                    />

                                    <Button type="submit" color="primary" variant="contained" className={classes.button}
                                            disabled={loading}>
                                        UPDAT{loading ? 'ING' : 'E'}
                                    </Button>
                                    <Mutation
                                        mutation={DELETE_ITEM_MUTATION}
                                        variables={{id}}
                                        update={(cache, payload) => {
                                            //    manually update the cache on the client, so it matches the server
                                            //    1. Read the cache for the items we want
                                            const data = cache.readQuery({query: ALL_ITEMS_QUERY});
                                            //    2. Filter the deleted item out of the page
                                            data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
                                            // Put the items back!
                                            cache.writeQuery({query: ALL_ITEMS_QUERY, data})
                                        }}
                                    >
                                        {(deleteItem, {error}) => (
                                            <>
                                                <GraphqlError error={error}/>
                                                <Button type="button" color="secondary"
                                                        variant="contained"
                                                        className={classes.button}
                                                        disabled={loading}
                                                        onClick={() => {
                                                            if (confirm('Are you sure you want to delete this item?')) {
                                                                //Return to home page
                                                                // if (!error) {
                                                                //     Router.push({
                                                                //         pathname: '/',
                                                                //     })
                                                                // }
                                                                deleteItem().catch(err => alert(err));
                                                            }
                                                        }}
                                                >
                                                    DELETE ITEM
                                                </Button>
                                            </>

                                        )}
                                    </Mutation>
                                </form>
                            )}
                        </Mutation>
                    )
                }}
            </Query>
        );
    }
}

UpdateItem.propTypes = {classes: PropTypes.any};

export default withStyles(styles)(UpdateItem);

export {UPDATE_ITEM_MUTATION};
export {SINGLE_ITEM_QUERY};
