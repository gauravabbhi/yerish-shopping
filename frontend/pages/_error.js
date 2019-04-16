import React from 'react';
import Error from 'next/error'
import Header from "../components/Header";

export default class CustomError extends React.Component {
    static getInitialProps({res, err}) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return {statusCode}
    }

    render() {
        return (
            <React.Fragment>
                <Header elevation={3}/>
                <Error statusCode={this.props.statusCode}/>
            </React.Fragment>
        )
    }
};
