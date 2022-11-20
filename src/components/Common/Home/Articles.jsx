import React from "react"
import {connect} from 'react-redux';
import { Col, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import classes from "scss/Public/Home.module.scss"

const Articles = props => {
    console.log(props.posts,'Article');
    return (
        <React.Fragment>
            <Col
                xl={11}
                lg={12}
                md={10}
                sm={12}
                className={`m-auto ${classes.Articles} `}
            >
                <Row>
                    <span>مقالات</span>
                </Row>
                <Row>
                    {
                        props.posts.map((item)=>{
                            return(
                                <Col xl={3} lg={3} md={6} sm={6} className={`${classes.Article}`}>
                                <Row  className='ml-1 mr-1'>
                                    <Col>
                                        {" "}
                                        <Row>
                                            <img
                                                src={item.introImage}
                                                alt={`تصویر پست ${item.title}`}
                                            />
                                        </Row>
                                        <Row>
                                            <h5>{item.title}</h5>
                                        </Row>
                                        <Row>
                                            <p
                                             dangerouslySetInnerHTML={{
                                                __html: item.content
                                            }}
                                            >
                                            </p>
                                        </Row>
                                        <Row>
                                            <FontAwesomeIcon
                                                icon={faArrowLeft}
                                                className={`${classes.arrowIcon}`}
                                            />
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
        
         
                            )
                        })
                    }
                 </Row>
            </Col>
        </React.Fragment>
    )
}


const mapStatesToProps = (state) => {
    return {
        posts: state.PublicLayout.posts
    }
}

export default connect(mapStatesToProps)(Articles);

