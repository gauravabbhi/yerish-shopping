import React, {Component} from 'react';
import {Grid, Button, Typography, withStyles} from "@material-ui/core";
import Link from 'next/link';
import Head from 'next/head';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import classNames from 'classnames';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {perPage} from "../config";
import PropTypes from "prop-types";

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;

const styles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing.unit * 2,
    },
    margin: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    buttonLight: {
        ...theme.palette.dayLight,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        '&:hover': {
            ...theme.palette.dayLight,
        }
    },
    buttonDark: {
        ...theme.palette.midNight,
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
        '&:hover': {
            ...theme.palette.midNight,
        }
    }
});

class Pagination extends Component {

    render() {
        const {classes, type, page} = this.props;
        return (
            <Query query={PAGINATION_QUERY}>
                {({data, loading, error}) => {
                    if (loading) return <p>Loading.....</p>;
                    const count = data.itemsConnection.aggregate.count;
                    const pages = Math.ceil(count / perPage);
                    return <Grid container justify="center" alignItems="center"
                                 className={classNames(classes.root, classes.margin)}>
                        <Head>
                            <title>Yerish Fits | Page {page} of {pages}</title>
                        </Head>
                        {page <= 1 ?
                            ""
                            :
                            <Grid item>
                                <Link prefetch href={{
                                    pathname: '/items',
                                    query: {type, page: page - 1}
                                }}>
                                    <Button component="a"
                                            className={type === 'light' ? classes.buttonLight : classes.buttonDark}
                                            disabled={page <= 1}
                                    >
                                        <KeyboardArrowLeft/> Prev
                                    </Button>
                                </Link>
                            </Grid>
                        }
                        <Grid item>
                            <Button className={type === 'light' ? classes.buttonLight : classes.buttonDark}>
                                Page {page} of {pages}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button className={type === 'light' ? classes.buttonLight : classes.buttonDark}>
                                Total {count} Products
                            </Button>
                        </Grid>
                        {pages <= page ? "" : <Grid item>
                            <Link prefetch href={{
                                pathname: '/items',
                                query: {type, page: page + 1}
                            }}>
                                <Button component="a"
                                        className={type === 'light' ? classes.buttonLight : classes.buttonDark}
                                        disabled={pages <= page}>
                                    Next <KeyboardArrowRight/>
                                </Button>
                            </Link>
                        </Grid>
                        }
                    </Grid>
                }}
            </Query>
        );
    }
}

Pagination.propTypes = {
    classes: PropTypes.any,
    type: PropTypes.any,
    page: PropTypes.any
};

export default withStyles(styles)(Pagination);
