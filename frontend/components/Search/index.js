import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import Router from 'next/router';
import {ApolloConsumer} from "react-apollo";
import gql from 'graphql-tag';
import debounce from 'lodash/debounce';
import {Grid, Typography, withStyles, TextField, Paper, MenuItem, Drawer, IconButton} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';

const SEARCH_ITEMS_QUERY = gql`
    query SEARCH_ITEMS_QUERY($searchTerm:String!){
        items(where:{
            OR:[
                {name_contains: $searchTerm},
                {description_contains: $searchTerm}
            ]
        }){
            id
            image
            name
            price
        }
    }
`;

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: '10vh 2vw',
        height: '70vh'
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        marginTop: theme.spacing.unit,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
    fullList: {
        width: 'auto',
    },
    typography: {
        ...theme.decorativeFont
    },
    grid: {
        padding: theme.spacing.unit * 4,
    },
    suggestion: {
        padding: theme.spacing.unit * 5,
    }
});

function renderSuggestion(
    {
        suggestion,
        classes,
        itemProps,
        index,
        highlightedIndex,
        selectedItem
    }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || "").indexOf(suggestion.id) > -1;

    return <MenuItem {...itemProps}
                     key={suggestion.id}
                     selected={isHighlighted}
                     component="div"
                     style={{
                         fontWeight: isSelected ? 500 : 400
                     }}
                     className={classes.suggestion}>
        <img width={70} src={suggestion.image} alt={suggestion.name}/>
        <Grid container direction="column">
            <Typography className={classes.typography} variant="h5">{suggestion.name}</Typography>
            <Grid container justify="space-between">
                <Typography className={classes.typography} variant="h6">${suggestion.price}</Typography>
                {/*TODO implement Out of stock for the products*/}
                {/*<Typography className={classes.typography} variant="h6">Out of Stock!</Typography>*/}
            </Grid>
        </Grid>
    </MenuItem>;
}


class Search extends Component {
    state = {
        drawer: false,
        items: [],
        loading: false
    };

    toggleTopDrawer = (open) => () => {
        this.setState({
            drawer: open,
            items: [],
            loading: false
        });
    };

    routeToItem = (item) => {
        this.setState({
            drawer: false,
        });
        Router.push({
            pathname: '/product',
            query: {
                id: item.id,
            },
        });
    };

    //Manually query apollo client
    onChangeHandler = debounce(async (e, client) => {
        //turn loading on
        this.setState({loading: true});
        const res = await client.query({
            query: SEARCH_ITEMS_QUERY,
            variables: {searchTerm: e.target.value},
        });

        this.setState({
            items: res.data.items,
            loading: false
        });

    }, 350);


    render() {
        const {classes} = this.props;

        return (
            <>
                <IconButton color="inherit" aria-haspopup="true" onClick={this.toggleTopDrawer(true)}>
                    <SearchIcon/>
                </IconButton>

                <Drawer anchor="top" open={this.state.drawer} onClose={this.toggleTopDrawer(false)}>
                    <Grid className={classes.grid} container justify="space-between" alignItems="center">
                        <Grid item>
                            <Typography tabIndex={0} className={classes.typography} variant="h4">SEARCH</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" aria-haspopup="true" onClick={this.toggleTopDrawer(false)}>
                                <Close tabIndex={0}/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <div role="div" className={classes.root}>
                        <Downshift onChange={this.routeToItem} onSelect={this.routeToItem}
                                   itemToString={item => (item === null ? '' : item.name)}>
                            {({
                                  getInputProps,
                                  getItemProps,
                                  getLabelProps,
                                  getMenuProps,
                                  getToggleButtonProps,
                                  isOpen,
                                  inputValue,
                                  highlightedIndex,
                                  selectedItem
                              }) => (
                                <div>
                                    <ApolloConsumer>
                                        {client => <TextField
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            {...getInputProps({
                                                onChange: e => {
                                                    e.persist();
                                                    this.onChangeHandler(e, client);
                                                },
                                                placeholder: "Search for a product"
                                            })}
                                            variant="outlined"
                                            type="search"
                                            fullWidth={true}
                                        />
                                        }
                                    </ApolloConsumer>

                                    {isOpen && <Paper className={classes.paper} square>
                                        {this.state.items.map((suggestion, index) =>
                                            renderSuggestion({
                                                suggestion,
                                                index,
                                                itemProps: getItemProps({item: suggestion}),
                                                highlightedIndex,
                                                selectedItem,
                                                classes
                                            })
                                        )}
                                    </Paper>
                                    }
                                    {isOpen && !this.state.items.length && !this.state.loading &&
                                    (
                                        <Paper className={classes.paper} square>
                                            <MenuItem>
                                                <Typography className={classes.typography}
                                                            variant="h6">
                                                    Nothing Found with {inputValue}
                                                </Typography>
                                            </MenuItem>
                                        </Paper>
                                    )
                                    }
                                </div>
                            )}
                        </Downshift>

                        <div className={classes.divider}/>
                    </div>
                </Drawer>
            </>
        );
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
