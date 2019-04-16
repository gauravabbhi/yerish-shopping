import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography, Fab, withStyles} from '@material-ui/core';
import {grey} from '@material-ui/core/colors';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import WhiteOutline from '../components/Buttons/WhiteOutline';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: 'Addidas Miami Edition',
        imgPath:
            '/static/img/0aa09269880953.5b905aff0e803.png',
    },
    {
        label: 'Nike Pirelli Intern Edition',
        imgPath:
            '/static/img/a245b974469059.5c30e58b4654c.jpg',
    },
    {
        label: 'Addidas Miami Edition',
        imgPath:
            '/static/img/0aa09269880953.5b905aff0e803.png',
    },
    {
        label: 'Nike Pirelli Intern Edition',
        imgPath:
            '/static/img/a245b974469059.5c30e58b4654c.jpg',
    },
    {
        label: 'Addidas Miami Edition',
        imgPath:
            '/static/img/0aa09269880953.5b905aff0e803.png',
    },
    {
        label: 'Nike Pirelli Intern Edition',
        imgPath:
            '/static/img/a245b974469059.5c30e58b4654c.jpg',
    },
];

const styles = theme => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    carouselTextDiv: {
        marginTop: '50vh'
    },
    carousel: {
        position: 'absolute',
        backgroundColor: 'transparent',
        marginTop: '-50vh',
        padding: '0 15px'
    },
    carouselButtons: {
        color: grey[50],
        backgroundColor: 'transparent',
        border: `1px solid ${grey[50]} `,
        '&:hover': {
            backgroundColor: grey[900],
            border: `2px solid ${grey[900]} `,
            color: grey[50],
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    carouselLargeText: {
        color: 'white',
        fontWeight: '900',
        textTransform: 'uppercase',
        [theme.breakpoints.down('md')]: {
            fontSize: '2rem',
            fontWeight: '700'
        }
    },
    img: {
        width: '100%',
        display: 'block',
        overflow: 'hidden',
        height: '100vh',
    },
    wideButton: {
        paddingLeft: 50,
        paddingRight: 50
    }
});

class carousel extends React.Component {
    state = {
        activeStep: 0,
    };

    handleNext = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(prevState => ({
            activeStep: prevState.activeStep - 1,
        }));
    };

    handleStepChange = activeStep => {
        this.setState({activeStep});
    };

    render() {
        const {classes, theme, pageContext} = this.props;
        const {activeStep} = this.state;
        const maxSteps = tutorialSteps.length;

        return (
            <div className={classes.root}>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents
                >
                    {tutorialSteps.map((step, index) => (
                        <div key={index}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <div className={classes.img}
                                     style={{
                                         background: `linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%), url(${step.imgPath})`,
                                         backgroundSize: 'cover',
                                         backgroundRepeat: 'no-repeat',
                                         backgroundPosition: 'center'
                                     }}>
                                    <Grid className={classes.carouselTextDiv} container direction="column" justify="center"
                                          alignItems="center">
                                        <Grid item md={12}>
                                            <Typography className={classes.carouselLargeText} variant="h1"
                                                        style={theme.decorativeFont}
                                                        gutterBottom>{step.label}</Typography>
                                        </Grid>
                                        <Grid item md={12}>
                                            <WhiteOutline size="large"> Shop </WhiteOutline>
                                        </Grid>
                                    </Grid>
                                </div>
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <Grid className={classes.carousel} container justify="space-between">
                    <Grid item>
                        <Fab className={classes.carouselButtons} size="small" onClick={this.handleBack}
                             disabled={activeStep === 0}>
                            <KeyboardArrowLeft fontSize="large"/>
                        </Fab>
                    </Grid>
                    <Grid item>
                        <Fab className={classes.carouselButtons} size="small" onClick={this.handleNext}
                             disabled={activeStep === maxSteps - 1}>
                            <KeyboardArrowRight fontSize="large"/>
                        </Fab>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

carousel.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(carousel);
