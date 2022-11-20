import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuoteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import classes from "scss/Layout/Public/Footer.module.scss";
import SocialNetwork from "components/layout/Public/Header/SocialNetwork";

const Footer = (props) => {
    return (
        <div className={classes.FooterMainWrapper}>
            <div className={classes.SubFooter}>
                <div className="nini-container row">
                    <Col md="7" className={[classes.FooterQuickAccess, 'd-flex flex-row justify-content-between'].join(' ')}>
                        <div className={classes.FooterColums}>
                            <h4>نی نی چک</h4>
                            <ul>
                                <li><NavLink to="/">صفحه نخست</NavLink></li>
                                <li><NavLink to="/blog">بلاگ</NavLink></li>
                                <li><NavLink to="/">درباره ما</NavLink></li>
                                <li><NavLink to="/">تماس با ما</NavLink></li>
                            </ul>
                        </div>
                        <div className={classes.FooterColums}>
                            <h4>مقالات</h4>
                            <ul>
                                {
                                    props.posts.map((item) => (<li key={item.id}><NavLink to={"/" + item.slug}>{item.title}</NavLink></li>))
                                }
                            </ul>
                        </div>
                        <div className={classes.FooterColums}>
                            <h4>شبکه&zwnj;های اجتماعی</h4>
                            <SocialNetwork socialNetworks={props.socialNetworks} className={classes.SocialNetwork} />
                        </div>
                    </Col>
                    <Col md={{ span: 4, offset: 1 }} className={[classes.FooterNewsletter, "shadow"].join(' ')}>
                        <FontAwesomeIcon icon={faQuoteLeft} size="3x" className={classes.Quote} />
                        <h4>خبرنامه</h4>
                        <p>برای دریافت تازه&zwnj;ترین مقالات ایمیل خود را وارد نمایید</p>
                        <div className={["d-flex flex-row justify-content-between"].join(' ')}>
                            <input type="text" placeholder="آدرس ایمیل" className="flex-grow-1 ml-2" />
                            <Button>ثبت نام</Button>
                        </div>
                    </Col>
                </div>
            </div>
            <div className={[classes.Copyright, "d-flex justify-content-center align-items-center"].join(' ')}>
                <p>تمامی حقوق محفوظ و متعلق به این سایت می&zwnj;باشد</p>
            </div>
        </div>
    );
}

const mapStatesToProps = (state) => {
    return {
        socialNetworks: state.PublicLayout.socialNetworks,
        posts: state.PublicLayout.posts
    }
}

export default connect(mapStatesToProps)(Footer);