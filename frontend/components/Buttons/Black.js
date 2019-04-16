import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {grey} from '@material-ui/core/colors';

const styles = theme => ({
    root: {
        ...theme.decorativeFont,
        fontSize:'2rem',
        color: grey[50],
        backgroundColor: grey['900'],
        padding: '1vh 7vw',
        textTransform:'uppercase',
        width:'100%',
        '&:hover': {
            backgroundColor: grey[50],
            color: grey[900],
            border: `2px solid ${grey[900]}`
        },
    },
});


function Black(props) {
    const {classes, children, size} = props;

    return (
        <Button size={size || 'medium'} className={classes.root}>
            {children}
        </Button>
    );
}

Black.propTypes = {
    classes: PropTypes.object.isRequired,
    size: PropTypes.string,
};

export default withStyles(styles)(Black);
