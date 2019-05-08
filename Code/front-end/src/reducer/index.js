import { combineReducers } from 'redux';
import UserReducer from './userReducer';
import OriginalArticleReducer from './originalArticleReducer';

export default combineReducers({user:UserReducer,originalArticle:OriginalArticleReducer});
