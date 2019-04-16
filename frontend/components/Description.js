import React, {Component} from 'react';
import {AppBar, Grid, Tab, Tabs, Typography, withStyles} from "@material-ui/core";
import SwipeableViews from 'react-swipeable-views';
import classNames from 'classnames';

const styles = theme => ({
    appBar: {
        ...theme.palette.dayLight,
        boxShadow: 'none',
    },
    tabsRoot: {
        borderBottom: '1px solid #e8e8e8',
    },
    tabRoot: {
        ...theme.palette.dayLight,
        ...theme.decorativeFont,
        fontSize: '1.5rem',
        '&:hover': {
            ...theme.palette.dayLight
        },
        '&$tabSelected': {
            ...theme.palette.dayLight,
            fontWeight: theme.typography.fontWeightMedium,
            borderBottom: '2px solid black',
        },
    },
    tabSelected: {},
});

const TabContainer = ({children, dir}) => {
    return (
        <Typography component="div" dir={dir} style={{padding: 8 * 3}}>
            {children}
        </Typography>
    );
};


class Description extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    handleChangeIndex = index => {
        this.setState({value: index});
    };

    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classNames(classes.root, classes.margin)} justify="center">
                <Grid item md={9}>
                    <AppBar className={classes.appBar} position="static">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            variant="fullWidth"
                            indicatorColor="midNight"
                            className={classes.tabsRoot}
                        >
                            <Tab classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                 label="Order and Shipping"/>
                            <Tab classes={{root: classes.tabRoot, selected: classes.tabSelected}}
                                 label="Information"/>
                            {/*<Tab classes={{root: classes.tabRoot, selected: classes.tabSelected}}*/}
                            {/*     label="Reviews"/>*/}
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis='x'
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabContainer dir="x">
                            <Grid container justify="space-between">
                                <Grid item xs={4}>
                                    <Typography variant="headline">
                                        Order And Shipping
                                    </Typography>
                                    <Typography>
                                        <br/>
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        Shipping domestically in the United States can take anywhere from 3-5
                                        business days upon order finalization. For our friends in other areas of the
                                        world, expect delivery 1-3 weeks upon your order. Due to increased demand
                                        globally, we’re working hard to cut down on this time for you.
                                    </Typography>
                                    <Typography>
                                        <br/>
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        For international orders, check your shipping fee at checkout.
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="headline">
                                        Product Information
                                    </Typography>
                                    <Typography>
                                        <br/>
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        The Clinton Tech Long Sleeve is the final piece rounding out the Clinton Tech
                                        Family of
                                        performance tops. Consistent with the tee and the tank, it’s super light weight,
                                        durable, and resilient through every wash and wear. A true multi-use shirt,
                                        designed for
                                        cooler temperatures and perfect for layering, training, and transitioning from
                                        indoor to
                                        outdoor.
                                        <Typography>
                                            <br/>
                                        </Typography>
                                        Like all members of the Clinton Tech Family, the Long Sleeve is cut for speed
                                        and
                                        tailored to cuddle not constrict the arms, chest, back, and shoulders.
                                        <Typography>
                                            <br/>
                                        </Typography>
                                        Most importantly, it is incredibly soft to the touch and given it’s fiber
                                        structure will
                                        move sweat away from the body as you’re putting it through it’s paces.
                                        <Typography>
                                            <br/>
                                        </Typography>
                                        As always, it’s subtly branded with the WOLACO logo. For those who know, it’s a
                                        Way of
                                        Life.
                                        <Typography>
                                            <br/>
                                        </Typography>
                                        Fabric Content: 74% Polyester, 19% Tencel, 7% Spandex.
                                        <Typography>
                                            <br/>
                                        </Typography>
                                        Designed in NYC. Manufactured in Southern California. Built Intentionally for
                                        You.
                                        <Typography>
                                            <br/>
                                        </Typography>
                                        Have questions about size/fit? Text us (424) 327-4137
                                    </Typography>
                                </Grid>
                            </Grid>
                        </TabContainer>
                        <TabContainer dir="x">
                            <Typography variant="subtitle2">
                                The Clinton Tech Long Sleeve is the final piece rounding out the Clinton Tech Family of
                                performance tops. Consistent with the tee and the tank, it’s super light weight,
                                durable, and resilient through every wash and wear. A true multi-use shirt, designed for
                                cooler temperatures and perfect for layering, training, and transitioning from indoor to
                                outdoor.
                                <Typography>
                                    <br/>
                                </Typography>
                                Like all members of the Clinton Tech Family, the Long Sleeve is cut for speed and
                                tailored to cuddle not constrict the arms, chest, back, and shoulders.
                                <Typography>
                                    <br/>
                                </Typography>
                                Most importantly, it is incredibly soft to the touch and given it’s fiber structure will
                                move sweat away from the body as you’re putting it through it’s paces.
                                <Typography>
                                    <br/>
                                </Typography>
                                As always, it’s subtly branded with the WOLACO logo. For those who know, it’s a Way of
                                Life.
                                <Typography>
                                    <br/>
                                </Typography>
                                Fabric Content: 74% Polyester, 19% Tencel, 7% Spandex.
                                <Typography>
                                    <br/>
                                </Typography>
                                Designed in NYC. Manufactured in Southern California. Built Intentionally for You.
                                <Typography>
                                    <br/>
                                </Typography>
                                Have questions about size/fit? Text us (424) 327-4137
                            </Typography>
                        </TabContainer>
                        {/*<TabContainer dir="x">Item Three</TabContainer>*/}
                    </SwipeableViews>
                </Grid>
            </Grid>
        );
    }
}


export default withStyles(styles)(Description);
