import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';

const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
        background: 'white',
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
        border: '1px solid rgba(0, 0, 0, 0.05)',
        borderLeft: '5px solid red',
    },
    p: {
        margin: 0,
        fontWeight: 100
    }
});

const DisplayError = ({error, classes}) => {
    if (!error || !error.message) return null;
    if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
        return error.networkError.result.errors.map((error, i) => (
            <React.Fragment>
                <div className={classes.root} key={i}>
                    <p className={classes.p} data-test="graphql-error">
                        <span>Error !</span>
                        {error.message.replace('GraphQL error: ', '')}
                    </p>
                </div>
            </React.Fragment>
        ));
    }
    return (
        <div className={classes.root}>
            <p className={classes.p} data-test="graphql-error">
                <span>Error !</span>
                {error.message.replace('GraphQL error: ', '')}
            </p>
        </div>
    );
};

DisplayError.defaultProps = {
    error: {},
};

DisplayError.propTypes = {
    error: PropTypes.object,
};

export default withStyles(styles)(DisplayError);
