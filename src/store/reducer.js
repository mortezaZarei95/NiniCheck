import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";

import authReducer from "store/Auth/reducer";
import commonReducer from "store/Common/reducer";
import categoryReducer from "store/Category/reducer";
import postReducer from "store/Post/reducer";
import socialNetworkReducer from "store/SocialNetwork/reducer";
import ConfigReducer from "store/Config/reducer";
import publicLayoutReducer from "store/PublicLayout/reducer";
import { watchCategory } from "store/Category/sagaWatcher";
import { watchPost } from "store/Post/sagaWatcher";
import { watchAuth } from "store/Auth/sagaWatcher";
import { watchSocialNetwork } from "store/SocialNetwork/sagaWatcher";
import { watchConfig } from "store/Config/sagaWatcher";
import { watchPublicLayout } from "store/PublicLayout/sagaWatcher";

const rootReducer = combineReducers({
    Auth: authReducer,
    Common: commonReducer,
    Category: categoryReducer,
    Post: postReducer,
    SocialNetwork: socialNetworkReducer,
    Config: ConfigReducer,
    PublicLayout: publicLayoutReducer
})

const logger = (state) => {
    return (next) => {
        return (action) => {
            // console.log('[middleware] dispatching', action);

            next(action);
        }
    }
}

const composeEnhancers = ((window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })) || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchCategory);
sagaMiddleware.run(watchPost);
sagaMiddleware.run(watchSocialNetwork);
sagaMiddleware.run(watchConfig);
sagaMiddleware.run(watchPublicLayout);

export default store;