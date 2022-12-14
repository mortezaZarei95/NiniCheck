import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Form from "components/Admin/Post/Form/Form";
import List from "components/Admin/Post/List/List";
import classes from "scss/Admin/Post.module.scss";
import slideClasses from "scss/Animations/SlideToBottom.module.scss";
import * as postActions from "store/Post/actions";
import { fetchAll as fetchCategories } from "store/Category/actions";
import withCommonError from "HOC/withCommonError";
import WithLoading from "HOC/WithLoading";
import Confirmation from "components/UI/Confirmation/Confirmation";
import { addAxiosAuthorization } from "helpers";
import { setDocumentTitle } from "store/Common/actions"


class Posts extends React.Component {

    state = {
        formMode: false,
        listMode: true,
        post: {
            title: '',
            slug: '',
            introImage: '',
            content: '',
            categoryId: null
        },
        showModal: false,
        modalMessage: "",
        selectedPost: "",
        editMode: false,
        transitionTiming: 300
    }

    handelShowForm = () => {
        this.props.onSetFormClose(false);

        this.setState({
            listMode: false,
        });
        setTimeout(() => {
            this.setState({
                formMode: true,
            });
        }, this.state.transitionTiming);
    }

    handelShowList = () => {
        this.setState({
            formMode: false
        });
        setTimeout(() => {
            this.setState({
                listMode: true,
                post: {
                    name: '',
                },
                editMode: false
            });
        }, this.state.transitionTiming);
    }

    classNames = {
        enter: slideClasses.SlideEnter,
        enterActive: slideClasses.SlideEnterActive,
        exit: slideClasses.SlideExit,
        exitActive: slideClasses.SlideExitActive,
    }

    componentDidUpdate() {
        if (this.props.closeForm && this.state.formMode) {
            this.handelShowList();
            this.props.onSetFormClose(false);
            this.setState({
                post: {
                    name: ""
                }
            })
        }
    }

    componentDidMount() {
        this.props.onChangeDocumentTitle();
        addAxiosAuthorization();
        this.props.onFetchCategories();
    }

    handleFetchList = () => {
        this.props.onFetchAll();
    }

    render() {
        let redirect = null;
        if (!this.props.auth || !this.props.auth.check)
            redirect = <Redirect to={{
                pathname: "/admin/signin",
                state: {
                    message: { text: `???????? ?????????? ???????? ????????`, type: 'Info' }
                }
            }} />

        return (
            <WithLoading>
                {redirect}
                <div className={classes.Wrapper}>
                    <CSSTransition in={this.state.formMode} mountOnEnter unmountOnExit timeout={{ enter: 600, exit: this.state.transitionTiming }} classNames={this.classNames}>
                        <div>
                            <Row>
                                <Col>
                                    <Form
                                        categories={this.props.categories}
                                        editMode={this.state.editMode}
                                        titleChangedHandler={this.handleTitleChange}
                                        categoryIdChangedHandler={this.handleCategoryChange}
                                        slugChangedHandler={this.handleSlugChange}
                                        introImageChangedHandler={this.handleIntroImageChange}
                                        contentChangedHandler={this.handleContentChange}
                                        submitHandler={this.handleSubmit}
                                        cancel={this.handelShowList}
                                        onSetError={this.props.onSetError}
                                        errors={this.props.errors}
                                        loading={this.props.loading}
                                        post={this.state.post}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </CSSTransition>
                    <CSSTransition in={this.state.listMode} mountOnEnter unmountOnExit timeout={{ enter: 600, exit: this.state.transitionTiming }} classNames={this.classNames}>
                        <div>
                            <Row>
                                <Col>
                                    <Button variant='outline-success' onClick={this.handelShowForm} className="d-flex flex-row align-items-center">
                                        ?????? ????????
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                    </Button>
                                </Col>
                            </Row>
                            <Row>

                                <Col>
                                    <List
                                        handleItemDelete={this.handleItemDelete}
                                        handleItemEdit={this.handleItemEdit}
                                        posts={this.props.posts}
                                        onFetchList={this.handleFetchList} />
                                </Col>
                            </Row>
                        </div>
                    </CSSTransition>
                    <Confirmation
                        modalMessage={this.state.modalMessage}
                        close={this.handleModalClose}
                        confirm={this.handleConfirm}
                        show={this.state.showModal} >
                        <div>
                            {this.state.modalMessage}
                        </div>
                    </Confirmation>
                </div>
            </WithLoading>
        )
    }
    handleConfirm = () => {
        this.handleModalClose();
        this.props.onDeletePost(this.state.selectedPost);
    }
    handleModalClose = () => {
        this.setState({
            showModal: false,
            selectedPost: ''
        });
    }
    handleTitleChange = (value) => {
        this.setState((prevState) => {
            return { post: { ...prevState.post, title: value } }
        });
    }
    handleSlugChange = (value) => {
        this.setState((prevState) => {
            return { post: { ...prevState.post, slug: value } }
        });
    }
    handleCategoryChange = (value) => {
        this.setState((prevState) => {
            return { post: { ...prevState.post, categoryId: value } }
        });
    }
    handleIntroImageChange = (value) => {
        this.setState((prevState) => {
            return { post: { ...prevState.post, introImage: value } }
        });
    }
    handleContentChange = (value) => {
        this.setState((prevState) => {
            return { post: { ...prevState.post, content: value } }
        });
    }
    handleSubmit = (event) => {
        if (!this.state.editMode)
            this.props.onStore(this.state.post);
        else
            this.props.onUpdate({
                title: this.state.post.title,
                slug: this.state.post.slug,
                introImage: this.state.post.introImage,
                content: this.state.post.content,
                categoryId: this.state.post.categoryId,
                id: this.state.selectedPost
            });
    }

    handleItemDelete = (postId) => {
        const post = this.props.posts.find((post) => {
            return post.id === postId;
        })
        this.setState({
            modalMessage: "?????? ???? ?????? ?????? \"" + post.title + "\" ?????????????? ????????????",
            showModal: true,
            selectedPost: postId
        });
    }
    handleItemEdit = (postId) => {
        const post = this.props.posts.find((post) => {
            return post.id === postId;
        })
        this.setState({
            selectedPost: postId,
            editMode: true,
            post: {
                title: post.title,
                slug: post.slug,
                introImage: post.introImage,
                categoryId: post.categoryId,
                content: post.content,
            },
        });
        this.handelShowForm();
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.Auth.auth,
        errors: state.Post.postFormErrors,
        loading: state.Post.loading,
        closeForm: state.Post.closeForm,
        posts: state.Post.posts,
        categories: state.Category.categories
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        onStore: (postData) => dispatch(postActions.newPost(postData)),
        onUpdate: (postData) => dispatch(postActions.updatePost(postData)),
        onSetError: (error) => dispatch(postActions.formSetError(error)),
        onSetFormClose: (state) => dispatch(postActions.setFormClose(state)),
        onFetchAll: () => dispatch(postActions.fetchAll()),
        onFetchCategories: () => dispatch(fetchCategories()),
        onDeletePost: (postId) => dispatch(postActions.deletePost(postId)),
        onChangeDocumentTitle: () => dispatch(setDocumentTitle('?????? ????'))
    }
}

export default connect(mapStateToProps, mapActionsToProps)((withCommonError(Posts)));