import React from "react";
import App from "../components/App";
import {Grid, withStyles} from "@material-ui/core";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit * 10
    }
});

const SignInPage = ({pageContext, classes}) => (
    <App pageContext={pageContext}>
        <Grid className={classes.root} container justify="space-around" alignItems="center">
            <SignIn/>
            <SignUp/>
        </Grid>
    </App>
);

SignInPage.getInitialProps = async (props) => {
    console.log(props);
    return {};
};

export default withStyles(styles)(SignInPage);
