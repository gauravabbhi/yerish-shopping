import React from 'react';
import { Grid, withStyles} from "@material-ui/core";
import {Query} from "react-apollo";
import {CURRENT_USER_QUERY} from "./User";
import SignIn from './SignIn';
import Loading from "./Loading";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 10,
        paddingBottom: theme.spacing.unit * 10
    }
});


const PleaseSignIn = ({classes, children}) => {
    return (
        <Query query={CURRENT_USER_QUERY}>
            {({data, loading}) => {
                if (loading) return <Loading/>;
                if (!data.me) {
                    return <Grid className={classes.root} container justify="center" alignItems="center">
                        <SignIn/>
                    </Grid>;
                }
                return children;
            }}
        </Query>
    );
};

export default withStyles(styles)(PleaseSignIn);
