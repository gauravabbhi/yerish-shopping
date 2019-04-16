import React from 'react';
import PropTypes from 'prop-types';
import Link from "next/link";
import Router from 'next/router';
import {AppBar, Button, Divider, Drawer, Typography, withStyles} from '@material-ui/core';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import SearchIcon from '@material-ui/icons/Search';
import {Dehaze} from '@material-ui/icons';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Cart from './Cart';
import User from './User';
import SignOut from "./SignOut";
import Search from "./Search";


const links = [
    {
        title: 'men',
        href: '/items?type=men'
    },
    {
        title: 'women',
        href: '/items?type=women'
    },
];

const styles = theme => ({
    root: {
        width: '100%',
    },
    menuButton: {
        color: 'inherit',
        [theme.breakpoints.up('md')]: {
            padding: '0px 25px'
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    mobileMenu: {
        width: 250,
        display: 'flex',
        flexDirection: 'column',

    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    toolBar: {
        justifyContent: 'space-between',
        paddingRight: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
    },
    darkNav: {
        ...theme.palette.transparentDark,
        top: '5vh',
        [theme.breakpoints.up('md')]: {
            top: '4.8vh',
        },
        [theme.breakpoints.up('xl')]: {
            top: '3vh',
        },
        '&:hover': {
            ...theme.palette.dayLight,
        },
    },
    lightNav: {
        ...theme.palette.transparentLight,
        top: '5vh',
        [theme.breakpoints.up('md')]: {
            top: '4.8vh',
        },
        [theme.breakpoints.up('xl')]: {
            top: '3vh',
        },
        '&:hover': {
            ...theme.palette.midNight,
        },
    }
});

class NavBar extends React.Component {
    state = {
        mounted: false,
        drawer: false,
    };
    toggleDrawer = (open) => () => {
        this.setState({
            drawer: open,
        });
    };


    render() {
        const {classes, elevation, position, type} = this.props;
        const renderMobileMenu = (
            <Drawer anchor="right" open={this.state.drawer} onClose={this.toggleDrawer(false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}
                >
                    <div className={classes.mobileMenu}>
                        {links.map((key, index) => (
                            <React.Fragment key={index}>
                                <Button className={classes.menuButton}>
                                    <Link href={key.href} prefetch>
                                        <a className={classes.link}>{key.title}</a>
                                    </Link>
                                </Button>
                                <Divider/>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </Drawer>
        );


        const NavItem = (
            <Toolbar className={classes.toolBar}>
                <Typography variant="h6" color="inherit" noWrap>
                    <Link href='/' prefetch>
                        <a className={classes.link}>Yerish Fits</a>
                    </Link>
                </Typography>
                <div className={classes.sectionDesktop}>
                    {links.map((key, index) => (
                        <Button key={index} className={classes.menuButton}>
                            <Link href={key.href} prefetch>
                                <a className={classes.link}>{key.title}</a>
                            </Link>
                        </Button>
                    ))}
                    <User>
                        {({data: {me}}) => {
                            if (me) return (<Button className={classes.menuButton}>
                                    <Link href="/sell" prefetch>
                                        <a className={classes.link}>Sell</a>
                                    </Link>
                                </Button>
                            );
                            return <> </>;
                        }}
                    </User>
                </div>
                <div>
                    <Search/>
                    <Button className={classes.menuButton}>
                        <User>
                            {({data: {me}}) => {
                                if (!me) return (<Link href='/signin' prefetch>
                                    <a className={classes.link}>Sign In</a>
                                </Link>);
                                return <>{me.name}</>
                            }}
                        </User>
                    </Button>

                    <User>
                        {({data: {me}}) => {
                            if (me) return (
                                <Button className={classes.menuButton}>
                                    <SignOut/>
                                </Button>
                            );
                            return <></>
                        }
                        }
                    </User>
                    <User>
                        {({data: {me}}) => {
                            if (me) return (
                                <Cart/>
                            );
                            return <> </>;
                        }}
                    </User>

                    <IconButton className={classes.sectionMobile} aria-haspopup="true"
                                onClick={this.toggleDrawer(true)} color="inherit">
                        <Dehaze/>
                    </IconButton>
                </div>
            </Toolbar>
        );

        let navBar;

        if (type === 'carousel') {
            navBar = <AppBar className={classes.darkNav} position={position || 'static'} elevation={+elevation}>
                {NavItem}
                {renderMobileMenu}
            </AppBar>;
        } else if (type === 'dark') {
            navBar = <AppBar className={classes.lightNav} position={position || 'static'} elevation={+elevation}>
                {NavItem}
                {renderMobileMenu}
            </AppBar>;
        } else {
            navBar = <AppBar className={classes.lightNav} position={position || 'static'} elevation={+elevation}>
                {NavItem}
                {renderMobileMenu}
            </AppBar>;
        }

        return (
            <>
                <div className={classes.root}>
                    {navBar}
                </div>
            </>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    elevation: PropTypes.number.isRequired
};

export default withStyles(styles)(NavBar);
