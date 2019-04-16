import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import {Grid, Typography, Button, Fab, withStyles} from "@material-ui/core";
import className from 'classnames';
import Edit from '@material-ui/icons/Edit';
import Star from '@material-ui/icons/StarRate';
import AddToCart from './AddToCart';


const styles = theme => ({
    margin: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    item: {
        '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        },
    },
    container: {
        position: 'relative',
        '&:hover $overlay': {
            display: 'block',
            background: 'rgba(0, 0, 0, .3)',
        },
        '&:hover $button': {
            opacity: 1,
        }
    },
    img: {
        position: 'relative',
        objectFit: "cover",
        cursor: 'pointer',
        [theme.breakpoints.up('xs')]: {
            width: 150,
            height: 200
        },
        [theme.breakpoints.up('md')]: {
            width: 303,
            height: 400
        },
    },
    overlay: {
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0)',
        transition: 'background 0.5s ease',
    },
    button: {
        margin: theme.spacing.unit,
        cursor: 'auto',
        textDecoration: 'none',
        position: "absolute",
        zIndex: 1,
        opacity: 0,
        transition: 'opacity .35s ease',
    },
    cart: {
        ...theme.palette.dayLight,
        right: 0,
        left: 0,
        bottom: 0,
        '&:hover': {
            ...theme.palette.midNight,
        }
    },
    edit: {
        ...theme.palette.dayLight,
        right: 0,
        top: 0,
        '&:hover': {
            ...theme.palette.midNight,
        }
    },
    itemText: {
        ...theme.decorativeFont,
        cursor: 'pointer',
        padding: theme.spacing.unit / 2,
        textTransform: 'uppercase',
    },
    link: {
        textDecoration: 'none',
    }
});

class Item extends Component {
    render() {
        const {classes, name, price, id, image, type} = this.props;
        let text;
        if (type === 'light') {
            text = <>
                <Grid item>
                    <Typography className={classes.itemText} variant="h6" style={{color: 'white'}}>
                        {name.length < 15 ? name.substring(12, 0) : `${name.substring(8, 0)}...`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.itemText} variant="h6" style={{color: 'white'}}>
                        {`$${price}/-`}
                    </Typography>
                </Grid>
            </>;
        } else {
            text = <>
                <Grid item>
                    <Typography className={classes.itemText} variant="h6">
                        {name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography className={classes.itemText} variant="h6">
                        {`$${price}/-`}
                    </Typography>
                </Grid>
            </>
        }
        return (
            <Grid className={className(classes.margin, classes.item)} item xl={2}>
                <Link href={`/product?id=${id}`}>
                    <div className={classes.container}>
                        <img className={classes.img} src={image} alt={name}/>
                        <div className={classes.overlay}/>
                        <Link href={`/update?id=${id}`}>
                            <a className={classes.link}>
                                {/*<Button size="small"*/}
                                {/*        className={className(classes.button, classes.edit)}>*/}
                                {/*    Edit*/}
                                {/*</Button>*/}
                                <Fab size="small" className={className(classes.button, classes.edit)}>
                                    <Edit/>
                                </Fab>
                            </a>
                        </Link>
                    </div>
                </Link>
                <Link href={`/product?id=${id}`}>
                    <a className={classes.link}>
                        <Grid className={classes.margin} container justify="space-between">
                            {text}
                        </Grid>
                    </a>
                </Link>
                <Grid className={classes.margin} container justify="space-between" alignItems="center">
                    <Grid item>
                        <Star/>
                        <Star/>
                        <Star/>
                        <Star/>
                        <Star/>
                    </Grid>
                    <Grid item>
                        <AddToCart classes={classes} id={id}/>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Item.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string
};

export default withStyles(styles, {withTheme: true})(Item);
