import React, {Component} from 'react';
import {Grid, Typography, withStyles} from "@material-ui/core";
import classNames from "classnames";
import Link from "next/link";

const styles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing.unit * 2,
    },
    margin: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    footer: {
        backgroundColor: '#eee',
        padding: theme.spacing.unit * 10
    },
    link: {
        textDecoration: 'none'
    }
});

class Footer extends Component {
    render() {
        const {classes} = this.props;
        return (
            <footer className={classNames(classes.root, classes.footer)}>
                <Grid container justify="space-around"
                      alignItems="center">
                    <Grid item xs={12} md={2}>
                        <Typography variant="h6" color="inherit" noWrap>
                            <Link href='/' prefetch>
                                <a className={classes.link}>Yerish Fits</a>
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h5" color="inherit" noWrap>
                                    About US
                                </Typography>
                                <Typography>
                                    <br/>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h5" color="inherit" noWrap>
                                    About US
                                </Typography>
                                <Typography>
                                    <br/>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h5" color="inherit" noWrap>
                                    About US
                                </Typography>
                                <Typography>
                                    <br/>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="h5" color="inherit" noWrap>
                                    About US
                                </Typography>
                                <Typography>
                                    <br/>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h6" color="inherit" noWrap>
                                    <Link href='/' prefetch>
                                        <a className={classes.link}>Yerish Fits</a>
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </footer>
        );
    }
}


export default withStyles(styles)(Footer);
