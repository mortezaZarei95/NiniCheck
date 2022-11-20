import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classes from "scss/Public/Blog.module.scss";
import { Card , Row, Col } from "react-bootstrap";


class Blog extends React.Component {

    render() {
        console.log(this.props , 'props');
        return (
            <div as={Row} className={classes.BlogIndex}>
                {
                    this.props.categories.map((category) => {
                        return <Card lg={5} key={category.slug} className={classes.category}>
                            <Link to={"/blog/" + category.slug}>{category.name}</Link>
                        </Card>
                    })
                }
            </div>
        );
    }
}

const mapStatesToProps = (state) => {
    return {
    categories: state.PublicLayout.categories,
    }
}

export default connect(mapStatesToProps)(Blog);