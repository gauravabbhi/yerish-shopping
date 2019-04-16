import React from 'react';
import {Grid, withStyles} from "@material-ui/core";
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import FeaturedBar from "./FeaturedBar";
import Item from "./Item";
import Pagination from "./Pagination";
import Loading from "./Loading";

export const ALL_ITEMS_QUERY = gql`
    query ALL_ITEMS_QUERY {
        items {
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
        backgroundColor: 'black',
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
});

const Items = ({classes}) => {

    return (
        <>
            <Grid container className={classes.root}>
                <FeaturedBar type="light" title="New In"/>
                <Query query={ALL_ITEMS_QUERY}>
                    {({data,error, loading}) => {
                        if (data) return <Loading/>;
                        return  data.items.map(item => <Item type="light" key={item.id} {...item}/>)
                    }}
                </Query>
                {/*<Pagination type="light"/>*/}
            </Grid>
        </>
    );
};

export default withStyles(styles, {withTheme: true})(Items);
