import React from "react";
import Head from 'next/head';
import Header from '../components/Header';
import Carousel from '../components/Carousel';
import Alert from "../components/Alert";
import Items from "../components/Items";
import Footer from "../components/Footer";


class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        const {pageContext} = this.props;
        return (
            <>
                <Head>
                    <title>Yerish Fits | Home</title>
                </Head>
                <Alert style={pageContext.theme.palette.midNight}>FREE SHIPPING ON ALL DOMESTIC ORDERS!</Alert>
                <Header type="carousel" position="absolute" elevation={0}/>
                <Carousel/>
                <Items />
                <Footer/>
            </>
        );
    }
}

// Index.propTypes = {};


export default Index;
