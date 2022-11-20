import React, { Component } from 'react';
import { connect } from "react-redux";

import { initiateFetchConfig } from "store/Config/actions";
import { setDocumentTitle } from "store/Common/actions";
import withCommonError from "HOC/withCommonError";
import classes from 'scss/Public/Home.module.scss';

class ContactUs extends Component {

   render() {
      return (
         <div className={classes.ContactUsPage}>
            dd6
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

export default connect(mapStatesToProps, mapActionsToProps)(withCommonError(ContactUs));