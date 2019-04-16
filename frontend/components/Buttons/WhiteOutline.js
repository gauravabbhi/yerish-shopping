import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {grey} from '@material-ui/core/colors';

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
    cssRoot: {
        fontFamily:'Anton',
        fontSize:'2rem',
        color: grey[50],
        backgroundColor: 'transparent',
        padding: '1vh 7vw',
        textTransform:'uppercase',
        border:`2px solid ${grey[50]} `,
        '&:hover': {
            backgroundColor: grey[900],
            border:`2px solid ${grey[900]} `,
            color: grey[50],
        },
    },
});


function White(props) {
    const {classes, children, size} = props;

    return (
        <Button size={size || 'medium'} variant="outlined" className={classNames(classes.margin, classes.cssRoot)}>
            {children}
        </Button>
    );
}

White.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(White);
