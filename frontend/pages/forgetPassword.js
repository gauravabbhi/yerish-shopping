import React from "react";
import App from "../components/App";
import {Grid, withStyles} from "@material-ui/core";
import ResetPassword from "../components/ResetPassword";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit * 10
    }
});

const SignInPage = ({pageContext, classes}) => (
    <App pageContext={pageContext}>
        <Grid className={classes.root} container justify="center" alignItems="center">
            <ResetPassword/>
        </Grid>
    </App>
);

export default withStyles(styles)(SignInPage);
