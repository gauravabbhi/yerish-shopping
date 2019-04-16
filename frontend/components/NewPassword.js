//TODO add email also as a required field
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Button, Grid, Typography, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Mutation} from "react-apollo";
import gql from 'graphql-tag';
import GraphqlError from './GraphqlErrorMessage';
import {CURRENT_USER_QUERY} from "./User";

const PASSWORD_RESET_MUTATION = gql`
    mutation PASSWORD_RESET_MUTATION($resetToken:String!, $password:String!, $confirmPassword:String!) {
        resetPassword(resetToken:$resetToken, password:$password, confirmPassword:$confirmPassword){
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

class NewPassword extends Component {
    static propTypes = {
        resetToken: PropTypes.string.required
    };

    state = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    render() {
        const {classes, resetToken} = this.props;
        return (
            <Grid className={classes.container} item>
                <Mutation mutation={PASSWORD_RESET_MUTATION}
                          variables={{
                              resetToken: resetToken,
                              password: this.state.password,
                              confirmPassword: this.state.confirmPassword
                          }}
                          refetchQueries={[{
                              query: CURRENT_USER_QUERY
                          }]}
                >
                    {(reset, {loading, error, called}) => (
                        <form onSubmit={
                            async (e) => {
                                //Stop the form from submitting
                                e.preventDefault();
                                //Call the mutation
                                await reset();
                                this.setState({
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                })
                            }
                        }>
                            <Typography variant="h5">
                                Reset your password
                            </Typography>
                            {!error && !loading && called && <Typography variant="body2">
                                Success! Your password has been reset successfully.
                            </Typography>
                            }
                            <GraphqlError error={error}/>
                            {/*<TextField*/}
                            {/*    id="email"*/}
                            {/*    name="email"*/}
                            {/*    label="Email"*/}
                            {/*    type="email"*/}
                            {/*    className={classes.textField}*/}
                            {/*    value={this.state.email}*/}
                            {/*    margin="normal"*/}
                            {/*    variant="outlined"*/}
                            {/*    onChange={e => this.handleChange(e)}*/}
                            {/*    required*/}
                            {/*    disabled={loading}*/}
                            {/*/>*/}
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                className={classes.textField}
                                value={this.state.password}
                                margin="normal"
                                variant="outlined"
                                onChange={e => this.handleChange(e)}
                                required
                                disabled={loading}
                            />
                            <TextField
                                id="confirm-password"
                                name="confirmPassword"
                                label="Confirm your Password"
                                type="password"
                                className={classes.textField}
                                value={this.state.confirmPassword}
                                margin="normal"
                                variant="outlined"
                                onChange={e => this.handleChange(e)}
                                required
                                disabled={loading}
                            />
                            <Button type="submit" variant="contained" className={classes.button}
                            >
                                SAVE
                            </Button>
                        </form>
                    )}
                </Mutation>
            </Grid>
        );
    }
}


export default withStyles(styles)(NewPassword);
