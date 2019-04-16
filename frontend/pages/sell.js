import React from "react";
import CreateItem from '../components/CreateItem';
import App from "../components/App";
import PleaseSignIn from "../components/PleaseSignIn";

const Sell = ({pageContext}) => (
    <App pageContext={pageContext}>
        <PleaseSignIn>
            <CreateItem/>
        </PleaseSignIn>
    </App>
);

export default Sell;
