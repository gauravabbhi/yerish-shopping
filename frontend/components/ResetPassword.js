import React, {Component} from 'react';
import {Button, Grid, Typography, withStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Mutation} from "react-apollo";
import gql from 'graphql-tag';
import GraphqlError from './GraphqlErrorMessage';

const REQUEST_PASSWORD_RESET_MUTATION = gql`
    mutation REQUEST_PASSWORD_RESET_MUTATION($email: String!) {
        requestReset(email: $email){
            message
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

class ResetPassword extends Component {
    state = {
        email: '',
    };

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({[name]: value});
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid className={classes.container} item>
                <Mutation mutation={REQUEST_PASSWORD_RESET_MUTATION}
                          variables={this.state}
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
                                })
                            }
                        }>
                            <Typography variant="h5">
                                Forget Password
                            </Typography>
                            <GraphqlError error={error}/>
                            {!error && !loading && called && <Typography variant="body2">
                                Success! Check your email for a reset link!
                            </Typography>
                            }
                            <TextField
                                id="password-reset-email"
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
                            <Button type="submit" variant="contained" className={classes.button}
                            >
                                Send
                            </Button>
                        </form>
                    )}
                </Mutation>
            </Grid>
        );
    }
}


export default withStyles(styles)(ResetPassword);
