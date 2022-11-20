import * as actionTypes from "./actionTypes";
import { updateObject } from "util/helpers";

const initialState = {
    postFormErrors: {
        title: '',
        slug: '',
        introImage: '',
        content: '',
        categoryId: ""
    },
    loading: false,
    closeForm: false,
    posts: [],
    frontPosts: [],
    frontPost: {
        Category:{
            id:'',
            name:'',
            slug:''
        },
        categoryId:0,
        content:'',
        id:0,
        introImage:'',
        slug:'',
        title:''
    },
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_FORM_SET_ERROR:
            return updateObject(state, { postFormErrors: action.data })
        case actionTypes.POST_FORM_SET_LOADING:
            return updateObject(state, { loading: action.data })
        case actionTypes.POST_SET_FORM_CLOSE:
            return updateObject(state, { closeForm: action.data })
        case actionTypes.POST_SET_ALL:
            return updateObject(state, { posts: action.data })
        case actionTypes.POST_SET_FRONT_ALL:
            return updateObject(state, { frontPosts: action.data })
        case actionTypes.POST_SET_FRONT_ONE:
            return updateObject(state, { frontPost: action.data })
        default:
            return state;
    }
}

export default reducer