import React from "react"
import { connect } from "react-redux"

import { getSectionData } from "helpers"
import withMessage from "HOC/withMessage"
import { initiateFetchConfig } from "store/Config/actions"
import classes from "scss/Public/Home.module.scss"
import Slide from "components/Common/Home/Slide"
import WelcomeMessage from "components/Common/Home/WelcomeMessage"
import StartTest from "components/Common/Home/StartTest"
import AboutTest from "components/Common/Home/AboutTest"
import Instagram from "components/Common/Home/Instagram"
import Articles from "components/Common/Home/Articles"

class Home extends React.Component {
    AboutIntro = ""

    componentDidMount() {
        // addAxiosAuthorization()
        // this.props.onFetchConfig('about');
    }

    handleShowInstaComponent = () => {
        var res = 0
        var instaLink = null
        //check socialNetworks
        this.props.socialNetworks.map(item => {
            if (item.id === 3) {
                res++
                instaLink = item.link
            }
            return null
        })
        return res === 0 ? null : <Instagram instagramLink={instaLink} />
    }

    setaboutUsText = () => {
        this.AboutIntro = getSectionData(this.props.ConfigStore, "about.intro")
    }
    render() {
        this.setaboutUsText()
        return (
            <div className={classes.MainWrapper}>
                <Slide />
                <WelcomeMessage AboutIntro={this.AboutIntro} />
                <StartTest />
                <AboutTest />
                {this.handleShowInstaComponent()}
                <Articles />
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return {
        categories: state.PublicLayout.categories,
        socialNetworks: state.PublicLayout.socialNetworks,
        ConfigStore: state.PublicLayout.config
    }
}

const mapActionsToProps = dispatch => {
    return {
        onFetchConfig: section => dispatch(initiateFetchConfig(section))
    }
}

export default withMessage(connect(mapStatesToProps, mapActionsToProps)(Home))
