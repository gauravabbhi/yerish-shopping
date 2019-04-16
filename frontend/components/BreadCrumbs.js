import React from 'react';
import {Grid, Typography, withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    }
});

const BreadCrumbs = ({classes}) => {
    return (
        <Grid container className={classes.root}>
            <Grid item>
                <Typography variant="overline">
                    T-SHIRTS > MEN
                </Typography>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(BreadCrumbs);
