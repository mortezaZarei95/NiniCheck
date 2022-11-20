import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const master = (props) => {
    return (
        <React.Fragment>
            <Header />
            { props.children }
            <Footer />
        </React.Fragment>
    )
}

export default master