import React, {Component} from 'react';
import {Grid, Typography, withStyles} from "@material-ui/core";

const styles = theme => ({
    fullScreen: {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'black',
        position: 'fixed',
        zIndex: 10000,
        top: 0,
        right: 0,
        left: 0,
    },
    typography: {
        ...theme.decorativeFont,
        color: 'white',
        textTransform: "uppercase",
    },
    animation:{
        animation: 'pulse 3s 5s ease-out infinite',
    },
    '@keyframes pulse':{
        '0%': {
            opacity:1,
            transform: 'none'
        },
        '25%': {
            opacity:.6,
            transform: 'scale(.6)'
        },
        '50%': {
            opacity:.8,
            transform: 'scale(.8)'
        },
        '75%': {
            opacity:.6,
            transform: 'scale(.6)'
        },
        '100%': {
            opacity:1,
            transform: 'none'
        }
    }
});

const LoadingScreen = ({classes}) => {
    return (
        <Grid className={classes.fullScreen} container justify="center" alignItems="center">
            <Grid item className={classes.animation}>
                <Typography variant="h1" className={classes.typography}>
                    Yerish Fits
                </Typography>
                <Typography variant="h4" className={classes.typography} align="center">
                    Shopping Dna Unleashed
                </Typography>
            </Grid>
        </Grid>
    );
};

export default withStyles(styles)(LoadingScreen);
