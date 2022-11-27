import {AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {appReducer} from "./state/appReducer";
import {usersReducer} from "./state/usersReducer";

const rootReducer = combineReducers({
    app: appReducer,
    users: usersReducer,
});

export const store = createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;