import { combineReducers } from 'redux';
import books from './booksReducer';
import users from './usersReducer';

const rootReducer = combineReducers({
    books,
    users
});

export default rootReducer;
