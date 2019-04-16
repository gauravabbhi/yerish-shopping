import React from "react";
import App from "../components/App";
import PleaseSignIn from "../components/PleaseSignIn";
import Permissions from '../components/Permissions';
import {Grid, withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit * 10
    }
});

const PermissionsPage = ({pageContext,classes}) => (
    <App pageContext={pageContext}>
        <PleaseSignIn>
            <Grid className={classes.root} container justify="center" alignItems="center">
                <Permissions/>
            </Grid>
        </PleaseSignIn>
    </App>
);

export default withStyles(styles)(PermissionsPage);
