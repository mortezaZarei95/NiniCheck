import React, { Fragment } from "react";
import { Row, Col, Form } from "react-bootstrap";
import CedarMaps from '@cedarstudios/react-cedarmaps';

const AboutUsForm = (props) => {

   const token = 'e123b6acba0a3d49b34c3f4e73e95b2e88875c7f';
   console.log(process.env.REACT_APP_CEDAR_MAP_KEY , 'REACT_APP_CEDAR_MAP_KEY');
   console.log(token , 'token');      // :(

   return (
      <Fragment>
         <Row>
            <Col lg={11} className='m-auto'>
               <Form >
                  <Row className='mt-5 mb-5'>

                     <Col sm="5">
                        <Form.Group as={Row} className='mb-4 mt-1' controlId="formLocation">
                           <Form.Label column sm="12">مختصات موقعیت مکانی :  </Form.Label>
                           <Col sm="5">
                              <Form.Control type="text" placeholder="Latitude" />
                           </Col>
                           <Col sm="5">
                              <Form.Control type="text" placeholder="Longitude" />
                           </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-4 mt-4' controlId="formMobileNumber">
                           <Form.Label column sm="12">شماره موبایل :  </Form.Label>
                           <Col sm="10">
                              <Form.Control type="text" placeholder="mobile Number" />
                           </Col>
                        </Form.Group>
                        <Form.Group as={Row} className='mb-4 mt-4' controlId="formPhoneNumber">
                           <Form.Label column sm="12">شماره تلفن :  </Form.Label>
                           <Col sm="10">
                              <Form.Control type="text" placeholder="phone Number" />
                           </Col>
                        </Form.Group>
                     </Col>
                     <Col sm="7">
                        <CedarMaps
                           containerStyle={{
                              height: '100%',
                              width: '100%',
                              margin: 0,
                              padding: 0
                           }}
                           token={token}
                           center={[51.34379364705882, 35.74109568627451]}
                        >
                        </CedarMaps>
                     </Col>
                  </Row>
                  <Row>
                     <Col>
                        <Form.Group as={Row} controlId="formAddress">
                           <Form.Label column sm="12"> آدرس :  </Form.Label>
                           <Col sm="12">
                              <Form.Control type="text" placeholder="Address" />
                           </Col>
                        </Form.Group>
                     </Col>
                  </Row>
               </Form>
            </Col>
         </Row>
      </Fragment>
   );
}

export default AboutUsForm;