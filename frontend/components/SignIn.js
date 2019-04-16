import React, {Component} from 'react';
import {Button, Grid, Typography, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Mutation} from "react-apollo";
import gql from 'graphql-tag';
import Router from 'next/router';
import GraphqlError from './GraphqlErrorMessage';
import {CURRENT_USER_QUERY} from './User';

const SIGN_IN_MUTATION = gql`
    mutation SIGN_IN_MUTATION($email: String! $password: String!) {
        signin(email: $email, password:$password){
            id
            name
            email
        }
    }
`;

const styles = theme => ({
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

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    render() {
        const {classes} = this.props;
        console.log(this.props);
        return (
            <Grid className={classes.container} item md={4}>
                <Mutation mutation={SIGN_IN_MUTATION}
                          variables={this.state}
                          refetchQueries={[{
                              query: CURRENT_USER_QUERY
                          }]}
                >
                    {(signin, {loading, error}) => (
                        <form onSubmit={
                            async (e) => {
                                //Stop the form from submitting
                                e.preventDefault();
                                //Call the mutation
                                await signin();
                                this.setState({
                                    email: '',
                                    password: ''
                                });

                                // //Return the page
                                // Router.push({
                                //     pathname: '/',
                                // });
                            }
                        }>

                            <Typography variant="h5">
                                Sign In to your Account
                            </Typography>
                            <GraphqlError error={error}/>
                            <TextField
                                id="signin-email"
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
                                id="signin-password"
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
                            <Typography component="a" href="/forgetPassword" variant="body2">
                                Forget Password?
                            </Typography>
                            <Button type="submit" variant="contained" className={classes.button}
                            >
                                Sign In
                            </Button>
                        </form>
                    )}
                </Mutation>
            </Grid>
        );
    }
}


export default withStyles(styles)(SignIn);
