import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {fab} from "@fortawesome/free-brands-svg-icons";
import classes from "scss/Layout/Public/SocialNetwork.module.scss";

library.add(fab);

const SocialNetwork = (props) => {
    let socialNetworks = null;
    if (props.socialNetworks.length) {
        socialNetworks = (
            <ul className={[classes.UlWrapper, props.className].join(' ')}>
                {
                    props.socialNetworks.map((item) => (
                        <li key={item.name}>
                            <a href={item.link}>
                                <FontAwesomeIcon size='2x' icon={[`fab`, item.name.toLowerCase()]} />
                                 <span className={classes.Title}>{item.name}
                                 </span>
                                 </a>
                        </li>
                    )
                    )
                }
            </ul>
        );
    }

    return (
        <React.Fragment>
            {socialNetworks}
        </React.Fragment>
    );
}

export default SocialNetwork;