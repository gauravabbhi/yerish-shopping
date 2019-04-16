import React, {Component} from 'react';
import Router from "next/router";
import {Button, Grid, Typography, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Mutation} from "react-apollo";
import gql from 'graphql-tag';
import GraphqlError from './GraphqlErrorMessage';
import {CURRENT_USER_QUERY} from "./User";

const SIGN_UP_MUTATION = gql`
    mutation SIGN_UP_MUTATION($name: String! $email: String! $password: String!) {
        signup(name: $name, email: $email, password:$password){
            id
            name
            email
            permission
        }
    }
`;

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit * 10
    },
    container: {
        border: '2px solid black',
        borderRadius: theme.spacing.unit,
        padding: theme.spacing.unit * 5,
        margin: theme.spacing.unit * 5
    },
    textField: {
        width: '100%'
    },
    button: {
        ...theme.palette.midNight,
        width: '100%',
        marginTop: theme.spacing.unit,
        '&:hover': {
            ...theme.palette.dayLight
        }
    }
});

class SignUp extends Component {
    state = {
        name: '',
        password: '',
        email: ''
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid className={classes.container} item md={4}>
                <Mutation
                    mutation={SIGN_UP_MUTATION}
                    variables={this.state}
                    refetchQueries={[
                        {query: CURRENT_USER_QUERY}
                    ]}
                >
                    {(signup, {loading, error}) => (
                        <form onSubmit={
                            async (e) => {
                                //Stop the form from submitting
                                e.preventDefault();
                                //Call the mutation
                                await signup();
                                // //Return the page
                                // Router.push({
                                //     pathname: '/',
                                // });
                                this.setState({
                                    name: '',
                                    password: '',
                                    email: ''
                                })
                            }
                        }>

                            <Typography variant="h5">
                                Sign Up for An Account
                            </Typography>
                            <GraphqlError error={error}/>
                            <TextField
                                id="signup-name"
                                name="name"
                                label="Name"
                                className={classes.textField}
                                value={this.state.name}
                                margin="normal"
                                variant="outlined"
                                onChange={e => this.handleChange(e)}
                                required
                                disabled={loading}
                            />
                            <TextField
                                id="signup-email"
                                name="email"
                                label="Email"
                                type="email"
                                className={classes.textField}
                                value={this.state.email}
                                margin="normal"
                                variant="outlined"
                                onChange={e => this.handleChange(e)}
                                required
                                disabled={loading}
                            />
                            <TextField
                                id="signup-password"
                                name="password"
                                type="password"
                                label="Password"
                                className={classes.textField}
                                value={this.state.password}
                                margin="normal"
                                variant="outlined"
                                onChange={e => this.handleChange(e)}
                                required
                                disabled={loading}
                            />
                            {/*<TextField*/}
                            {/*    id="confirm_password"*/}
                            {/*    name="confirm_password"*/}
                            {/*    type="password"*/}
                            {/*    label="Confirm Password"*/}
                            {/*    className={classes.textField}*/}
                            {/*    value={this.state.password}*/}
                            {/*    margin="normal"*/}
                            {/*    variant="outlined"*/}
                            {/*    onChange={e => this.handleChange(e)}*/}
                            {/*    required*/}
                            {/*    disabled={loading}*/}
                            {/*/>*/}
                            <Button type="submit" variant="contained" className={classes.button}
                            >
                                Sign Up
                            </Button>
                        </form>
                    )}
                </Mutation>
            </Grid>
        );
    }
}


export default withStyles(styles)(SignUp);
