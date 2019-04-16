import React, {Component} from 'react';
import {Grid, Typography, withStyles} from "@material-ui/core";

const styles = theme => ({
        featuredSection: {
            paddingTop: theme.spacing.unit * 4,
            [theme.breakpoints.up('md')]: {
                paddingTop: theme.spacing.unit * 4 * 4,
            }
        },
        featuredHeadingLight: {
            ...theme.decorativeFont,
            ...theme.palette.transparentDark,
            textTransform: 'uppercase',
        },
        featuredHeadingDark: {
            ...theme.decorativeFont,
            ...theme.palette.transparentLight,
            textTransform: 'uppercase',
        },
        featuredButtonDiv: {
            paddingRight: theme.spacing.unit * 4,
            paddingBottom: theme.spacing.unit * 4,
            paddingTop: theme.spacing.unit * 2,
        },
        featuredButtonLight: {
            ...theme.decorativeFont,
            ...theme.palette.transparentDark,
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
            borderBottom: '2px solid transparent',
            '&:hover': {
                borderBottom: '2px solid #fff',
            }
        },
        featuredButtonDark: {
            ...theme.decorativeFont,
            ...theme.palette.transparentLight,
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
            borderBottom: '2px solid transparent',
            '&:hover': {
                borderBottom: '2px solid #fff',
            }
        },
    })
;

class FeaturedBar extends Component {
    render() {
        const {classes, title, menu,type} = this.props;
        return (
            <>
                <Grid container className={classes.featuredSection}>
                    <Grid item>
                        <Typography className={classes.featuredHeadingDark} variant="h4">
                            {title}
                        </Typography>
                    </Grid>
                </Grid>

                {/*<Grid container justify="space-between">*/}
                {/*    <Grid item>*/}
                {/*        <Grid container>*/}
                {/*            <Grid className={classes.featuredButtonDiv} item>*/}
                {/*                <Typography className={classes.featuredButtonDark} variant="body2">*/}
                {/*                    Men*/}
                {/*                </Typography>*/}
                {/*            </Grid>*/}
                {/*            <Grid className={classes.featuredButtonDiv} item>*/}
                {/*                <Typography className={classes.featuredButtonDark} variant="body2">*/}
                {/*                    Women*/}
                {/*                </Typography>*/}
                {/*            </Grid>*/}
                {/*        </Grid>*/}
                {/*    </Grid>*/}
                {/*<Grid className={classes.featuredButtonDiv} item>*/}
                {/*<Typography className={classes.featuredButton} variant="body2">*/}
                {/*Women*/}
                {/*</Typography>*/}
                {/*</Grid>*/}
                {/*</Grid>*/}
            </>
        );
    }
}

export default withStyles(styles, {withTheme: true})(FeaturedBar);
