// TODO implement upload multiple files
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, Button, withStyles} from '@material-ui/core';
import classNames from 'classnames';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import Router from 'next/router';
import GraphqlError from "./GraphqlErrorMessage";
import {ALL_ITEMS_QUERY} from "./Items";

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String) {
        createItem(
            name: $name,
            description: $description,
            price: $price,
            image: $image,
            largeImage: $largeImage
        ){
            id
            name
            description
        }
    }
`;

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing.unit * 5,
        margin: theme.spacing.unit * 5,
        border: '2px solid black',
        borderRadius: theme.spacing.unit,
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
    browseButton: {},
    button: {
        margin: theme.spacing.unit,
        width: '50vw'
    },
    box: {
        border: '2px solid black',
        borderRadius: theme.spacing.unit,
    }
});


class CreateItem extends Component {
    state = {
        name: 'Shoes',
        price: 100,
        description: 'I Love these Shoes',
        file: {},
        image: '/static/img/Upload_image.png',
        largeImage: 'dog.jpg'
    };

    handleChange = e => {
        const {name, type, value} = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({[name]: val});
    };

    async handleFileUpload(e) {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'yerish_products');

        const res = await fetch('https://api.cloudinary.com/v1_1/yerish-fits/image/upload/', {
            method: 'POST',
            body: data
        });

        const file = await res.json();

        this.setState({
            image: file.secure_url,
            largeImage: file.eager[0].secure_url,
        });

    }

    render() {
        let {classes} = this.props;
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}
                      update={(cache) => {
                          //    manually update the cache on the client, so it matches the server
                          //    1. Read the cache for the query we want
                          const data = cache.readQuery({query: ALL_ITEMS_QUERY});
                          //    2. Push recent data to the cache
                          data.items = {...data, ...this.state};
                          cache.writeQuery({query: ALL_ITEMS_QUERY, data});
                      }}
            >
                {(createItem, {loading, error}) => (
                    <form className={classes.container} encType="multipart/form-data"
                          onSubmit={
                              async (e) => {
                                  //Stop the form from submitting
                                  e.preventDefault();
                                  //Call the mutation
                                  const res = await createItem();
                                  //Return the page
                                  Router.push({
                                      pathname: '/product',
                                      query: {id: res.data.createItem.id}
                                  })
                              }
                          }>
                        <GraphqlError error={error}/>
                        <TextField
                            id="name"
                            name="name"
                            label="Name"
                            className={classes.textField}
                            value={this.state.name}
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
                            value={this.state.description}
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
                            value={this.state.price}
                            margin="normal"
                            variant="outlined"
                            onChange={e => this.handleChange(e)}
                            disabled={loading}
                            required
                        />
                        <input
                            accept="image/*"
                            className={classes.browse}
                            id="upload-file"
                            type="file"
                            onChange={e => this.handleFileUpload(e)}
                            required
                        />
                        <label htmlFor="upload-file">
                            <Button variant="outlined" component="span" className={classes.button}
                                    disabled={loading}>
                                Upload Image
                            </Button>
                        </label>
                        {
                            this.state.image && <img src={this.state.image} alt="Upload Preview"/>
                        }
                        <Button type="submit" color="primary" variant="contained" className={classes.button}
                                disabled={loading}>
                            Save
                        </Button>
                    </form>
                )}
            </Mutation>
        );
    }
}

CreateItem.propTypes = {classes: PropTypes.any};

export default withStyles(styles)(CreateItem);
export {CREATE_ITEM_MUTATION};
