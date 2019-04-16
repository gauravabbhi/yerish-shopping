import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Alert from "./Alert";

const App = ({children, pageContext}) => {
    return (
        <>
            <Alert style={pageContext.theme.palette.midNight}>FREE SHIPPING ON ALL DOMESTIC ORDERS!</Alert>
            <Header elevation={2}/>
            {children}
            <Footer/>
        </>
    );
};

export default App;
