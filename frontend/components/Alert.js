import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography }from "@material-ui/core";

const Alert = ({children, style}) => {
    return (
        <Grid container direction="row" justify="center" alignItems="center" style={style}>
            <Grid item>
                <Typography variant="overline" style={{color: '#fff'}}>
                    {children}
                </Typography>
            </Grid>
        </Grid>
    );
};

Alert.propTypes = {
    children: PropTypes.string.isRequired,
    style:PropTypes.object.isRequired
};

export default Alert;
