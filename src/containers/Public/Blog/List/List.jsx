import React from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router"
import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

import { frontFetchAll } from "store/Post/actions"
import WithLoading from "HOC/WithLoading"
import { stripHtml } from "helpers"
import classes from "scss/Public/Blog.module.scss";

// import { Link } from "react-router-dom";

class BlogList extends React.Component {
    componentDidMount() {
        this.props.onFetchAll(this.props.match.params.category)
    }
    render() {
        return (
            <WithLoading>
                <ListGroup className={classes.BlogList}>
                    {this.props.posts.map(post => {
                        return (
                            <Link to={"/" + post.slug} className="media"
                                key={post.id}
                            >
                            <ListGroup.Item
                                className={`d-flex flex-row flex-nowrap justify-content-between align-items-center ${classes.listGroup}`}
                            >
                                    {post.introImage && (
                                        <img
                                            src={post.introImage}
                                            className="align-self-center ml-3"
                                            alt={"تصویر معرف - " + post.title}
                                        />
                                    )}
                                    <div className={classes.mediaBody}>
                                        <h6 className="mt-0">{post.title}</h6>
                                        <small>({post.Category.name})</small>
                                        <div>{stripHtml(post.content)}</div>
                                    </div>
                            </ListGroup.Item>
                                </Link>
                        )
                    })}
                </ListGroup>
            </WithLoading>
        )
    }
}

const mapStatesToProps = state => {
    return {
        posts: state.Post.frontPosts
    }
}

const mapActionsToProps = dispatch => {
    return {
        onFetchAll: category => dispatch(frontFetchAll(category))
    }
}

export default connect(
    mapStatesToProps,
    mapActionsToProps
)(withRouter(BlogList))
