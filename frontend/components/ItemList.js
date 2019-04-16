import React, {Component} from 'react';
import {Grid, withStyles} from "@material-ui/core";
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Item from "./Item";
import Pagination from "./Pagination";
import BreadCrumbs from "./BreadCrumbs";
import PropTypes from "prop-types";
import FeaturedBar from "./FeaturedBar";
import {perPage} from "../config";
import Loading from "./Loading";

export const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
        items(skip: $skip,first: $first,orderBy: createdAt_DESC ) {
            id
            name
            price
            description
            image
            largeImage
        }
    }
`;

const styles = theme => ({
    root: {
        width: '100%',
        margin: 0,
        paddingRight: theme.spacing.unit * 4,
        paddingLeft: theme.spacing.unit * 4,
        [theme.breakpoints.only('xs')]: {
            paddingRight: theme.spacing.unit,
            paddingLeft: theme.spacing.unit,
            justifyContent: 'space-around'
        },
        [theme.breakpoints.only('sm')]: {
            justifyContent: 'space-between'
        },
        [theme.breakpoints.only('md')]: {
            justifyContent: 'space-between'
        },
        [theme.breakpoints.up('lg')]: {
            paddingRight: theme.spacing.unit * 2,
            paddingLeft: theme.spacing.unit * 2,
            justifyContent: 'space-between'
        },
    },
    margin: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
});

class ItemList extends Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const {classes, page, type} = this.props;
        const {expanded} = this.state;
        return (
            <>
                <Grid container className={classes.root}>
                    <BreadCrumbs/>
                    <Grid container>
                        <Grid item>
                            <FeaturedBar title="Men Shirts"/>
                        </Grid>
                    </Grid>
                    <Query query={ALL_ITEMS_QUERY} variables={{
                        skip: page * perPage - perPage,
                        first: perPage
                    }}>
                        {({data, error, loading}) => {
                            if (loading) return <Loading/>;
                            return data.items.map(item => <Item key={item.id} {...item}/>)
                        }}
                    </Query>
                    <Pagination type={type} page={page}/>
                </Grid>
            </>
        );
    }
}

ItemList.propTypes = {classes: PropTypes.any};

export default withStyles(styles, {withTheme: true})(ItemList);
