import React from "react";
import App from "../components/App";
import UpdateItem from '../components/UpdateItem';
import PleaseSignIn from "../components/PleaseSignIn";

const Sell = ({query, pageContext}) => (
    <App pageContext={pageContext}>
        <PleaseSignIn>
            <UpdateItem id={query.id}/>
        </PleaseSignIn>
    </App>
);

export default Sell;
