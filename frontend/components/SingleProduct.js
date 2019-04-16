import React, {Component} from 'react';
import {Grid, Typography, Button, withStyles} from "@material-ui/core";
import Head from 'next/head';
import classNames from 'classnames';
import Star from '@material-ui/icons/StarRate';
import Check from '@material-ui/icons/Check';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import BreadCrumbs from "./BreadCrumbs";
import Black from "./Buttons/Black";
import Description from "./Description";
import Loading from "./Loading";


export const SINGLE_ITEMS_QUERY = gql`
    query SINGLE_ITEMS_QUERY($id : ID!) {
        item(where:{ id: $id}) {
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
        padding: theme.spacing.unit * 2,
    },
    margin: {
        marginTop: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit * 2,
    },
    imgWrap: {
        position: 'relative',
    },
    image: {
        width: '100%'
    },
    productDetailsContent: {
        marginLeft: theme.spacing.unit * 4,
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
            marginLeft: 0
        },
    },
    productName: {
        ...theme.decorativeFont,
    },
    colorButton: {
        height: theme.spacing.unit * 4,
        width: theme.spacing.unit * 5,
        '&:hover': {
            borderRight: '3.5px solid white',
            borderLeft: '3.5px solid white',
        }
    },
    sizeButton: {
        ...theme.decorativeFont,
        marginRight: theme.spacing.unit * 2,
        '&:hover': {
            ...theme.palette.midNight,
        }
    },
});

class SingleProduct extends Component {
    componentDidMount() {
        let windowWidth = window.innerWidth;
        if (windowWidth > 600) {
            window.addEventListener('scroll', this.handleScroll);
        }
    };

    componentWillUnmount() {
        let windowWidth = window.innerWidth;
        if (windowWidth > 600) {
            window.removeEventListener('scroll', this.handleScroll);
        }
    };

    handleScroll = async () => {
        let imageSection = document.getElementById('imageSection');
        let imageSectionHeight = await imageSection.offsetHeight;
        let textSection = document.getElementById('textSection');
        let textSectionHeight = textSection.offsetHeight;
        let pageYOffset = window.pageYOffset;
        let windowWidth = window.innerWidth;
        if (((imageSectionHeight - textSectionHeight) > pageYOffset) && (pageYOffset > 200) && (windowWidth > 600)) {
            textSection.removeAttribute("style");
            textSection.style.position = 'fixed';
            textSection.style.top = '0px';
            textSection.style.width = '50vw';
        } else if (pageYOffset < 220) {
            textSection.removeAttribute("style");
            textSection.style.position = 'relative';
        } else {
            textSection.removeAttribute("style");
            textSection.style.position = 'relative';
            textSection.style.transform = `translate3d(0px, ${Math.abs(imageSectionHeight - (textSectionHeight + 30))}px, 0px)`;
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <Query query={SINGLE_ITEMS_QUERY} variables={{id: this.props.id}}>
                {({data, error, loading}) => {
                    if (error) return <p>Error!</p>;
                    if (loading) return <Loading/>;
                    if (!data.item) return <p>Product not Found</p>;
                    return <>
                        <Head>
                            <title>Yerish Fits | {data.item.name}</title>
                        </Head>
                        <Grid className={classes.root} container justify="space-between"
                              onScroll={(e) => this.handleScroll(e)}>
                            <BreadCrumbs/>
                            <Grid id="imageSection" item sm={6}>
                                <div className={classNames(classes.imgWrap, classes.margin)}>
                                    <img className={classes.image}
                                         src={data.item.image}
                                         alt={data.item.name}/>
                                </div>
                            </Grid>
                            <Grid item sm={6}>
                                <div id="textSection"
                                     className={classNames(classes.productDetailsContent, classes.margin)}>
                                    <Grid container alignItems="center">
                                        <Grid item xs={8}>
                                            <Typography className={classes.productName} variant="h3">{data.item.name}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant="h6">{`$${data.item.price}/-`}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.margin}>
                                        <Grid item>
                                            <Star/>
                                            <Star/>
                                            <Star/>
                                            <Star/>
                                            <Star/>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.margin}>
                                        <Grid item className={classes.colorButton} style={{backgroundColor: 'red'}}>
                                            <Check style={{color: 'white', margin: 5}}/>
                                        </Grid>
                                        <Grid item className={classes.colorButton} style={{backgroundColor: 'yellow'}}/>
                                        <Grid item className={classes.colorButton} style={{backgroundColor: 'blue'}}/>
                                        <Grid item className={classes.colorButton} style={{backgroundColor: 'pink'}}/>
                                        <Grid item className={classes.colorButton} style={{backgroundColor: 'green'}}/>
                                        <Grid item className={classes.colorButton} style={{backgroundColor: 'black'}}/>
                                    </Grid>
                                    <Grid container className={classes.margin}>
                                        <Grid item>
                                            <Typography variant="body2"> Calculate Size</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.margin}>
                                        <Button className={classes.sizeButton} variant="outlined" size="large">
                                            XL
                                        </Button>
                                        <Button className={classes.sizeButton} variant="outlined" size="large">
                                            XL
                                        </Button>
                                        <Button className={classes.sizeButton} variant="outlined" size="large">
                                            XL
                                        </Button>
                                        <Button className={classes.sizeButton} variant="outlined" size="large">
                                            XL
                                        </Button>
                                        <Button className={classes.sizeButton} variant="outlined" size="large">
                                            XL
                                        </Button>
                                    </Grid>
                                    <Grid container className={classes.margin}>
                                        <Grid item>
                                            <Black>Add to Cart</Black>
                                        </Grid>
                                    </Grid>
                                    <Grid container className={classes.margin}>
                                        <Typography>
                                            Free shipping on all domestic orders
                                        </Typography>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid className={classes.root} container>
                            <Description/>
                        </Grid>
                    </>
                }}
            </Query>
        );
    }
}

export default withStyles(styles)(SingleProduct);
