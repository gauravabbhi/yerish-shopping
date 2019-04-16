import React from "react";
import App from "../components/App";
import ItemList from "../components/ItemList";

const Items = ({pageContext,query}) => (
    <App pageContext={pageContext}>
        <ItemList type={query.type || "all"} page={parseFloat(query.page) || 1}/>
    </App>
);

export default Items;
