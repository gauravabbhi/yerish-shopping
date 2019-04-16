import React from "react";
import App from "../components/App";
import {Grid, withStyles} from "@material-ui/core";
import NewPassword from "../components/NewPassword";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit * 10
    }
});

const SignInPage = ({pageContext, classes, query}) => (
    <App pageContext={pageContext}>
        <Grid className={classes.root} container justify="center" alignItems="center">
            <NewPassword resetToken={query.resetToken}/>
        </Grid>
    </App>
);

export default withStyles(styles)(SignInPage);
