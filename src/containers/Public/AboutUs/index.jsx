import React, { Component } from 'react';
import { connect } from "react-redux";

import { initiateFetchConfig } from "store/Config/actions";
import { setDocumentTitle } from "store/Common/actions";
import withCommonError from "HOC/withCommonError";
import { addAxiosAuthorization } from "helpers";
import classes from "scss/Public/AboutUs.module.scss";
import {getSectionData} from 'helpers';

class AboutUs extends Component {

   AboutHtml = '';

   setInputForm = () => {
      this.AboutHtml=getSectionData(this.props.ConfigStore , 'about.html')
   }
   componentDidMount() {
      addAxiosAuthorization()
      this.props.onChangeDocumentTitle();
      this.props.onFetchConfig('about');
   };
   // componentDidUpdate() {
   //    document.getElementsByClassName('AboutUsPage')[0].innerHTML = this.AboutHtml;

   // };

   render() {
      this.setInputForm();
      console.log(this.props.ConfigStore ,'ConfigStoreAboutUs');
      return (
         <div className={classes.AboutUsPage}>
            <div className='AboutUsPage'
            dangerouslySetInnerHTML={{
               __html: this.AboutHtml
           }}
            >
            </div>
         </div>
      );
   }
}

const mapStatesToProps = ((state) => {
   return {
      loading: state.Config.loading,
      ConfigStore: state.PublicLayout.config,
   }
})

const mapActionsToProps = ((dispatch) => {
   return {
      onChangeDocumentTitle: () => dispatch(setDocumentTitle('درباره ما')),
      onFetchConfig: (section) => dispatch(initiateFetchConfig(section)),
   }
})

export default connect(mapStatesToProps, mapActionsToProps)(withCommonError(AboutUs));