import React from "react";
import { connect } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";

import { initiateFetchConfig, saveConfig, setConfig } from "store/Config/actions";
import { setDocumentTitle } from "store/Common/actions";
import WithLoading from "HOC/WithLoading";
import withCommonError from "HOC/withCommonError";
import { addAxiosAuthorization } from "helpers";
import ContactUsForm from "components/Admin/ContactUs/Form";
import {getSectionData} from 'helpers';

class AboutUs extends React.Component {
   state = {
      config: []
   }

   handleSubmit = (Aboutdata) => {
      let config = [
         {
            key: 'about.html',
            value: Aboutdata.AboutHtml ? Aboutdata.AboutHtml : ""
         },
         {
            key: 'about.intro',
            value: Aboutdata.AboutIntro
         }
      ]
      this.props.onSetConfig(config);
      this.props.onSaveConfig(config);
      this.setState((oldState) => ({
         ...oldState,
         config
      }))
   }

   componentDidMount() {
      addAxiosAuthorization()
      this.props.onChangeDocumentTitle();
      this.props.onFetchConfig('about');
   }

   setInputForm = () => {
      this.AboutIntro=getSectionData(this.props.dataStore, 'about.intro')
      this.AboutHtml=getSectionData(this.props.dataStore , 'about.html')
   }

   render() {
      this.setInputForm()
      return (
         <WithLoading>
            <Row>
               <Col xs={12} md={{ span: 8, offset: 2 }} lg={{ span: 10, offset: 1 }}>
                  <Card className="shadow-lg">
                     <Card.Header>ویرایش ارتباط با ما</Card.Header>
                     <Card.Body className="p-0">
                        <ContactUsForm/>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </WithLoading>
      );
   }
}


const mapStatesToProps = ((state) => {
   return {
      loading: state.Config.loading,
      dataStore: state.Config.config,
   }
})

const mapActionsToProps = ((dispatch) => {
   return {
      onChangeDocumentTitle: () => dispatch(setDocumentTitle('درباره ما')),
      onFetchConfig: (section) => dispatch(initiateFetchConfig(section)),
      onSaveConfig: (data) => dispatch(saveConfig(data)),
      onSetConfig: (data) => dispatch(setConfig(data)),
   }
})

export default connect(mapStatesToProps, mapActionsToProps)(withCommonError(AboutUs));