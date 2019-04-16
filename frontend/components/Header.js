import React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from './NavBar';

Router.onRouteChangeStart = () => {
    NProgress.start();
};

Router.onRouteChangeComplete = () => {
    NProgress.done();
};

Router.onRouteChangeError = () => {
    NProgress.done();
};




const Header = (props) => (
    <React.Fragment>
        <Nav {...props}/>
    </React.Fragment>
);

export default Header;
