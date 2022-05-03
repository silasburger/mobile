import { GOT_BOOKS, SET_CURR_PAGE, SET_LOADING } from '../actions/actionTypes';

const initialState = {books: [], bookCount: 0, currPage: 0, loadingBooks: false};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_BOOKS:
      return {
        ...state,
        books: action.books,
        bookCount: action.count,
        loadingBooks: false,
      };
    case SET_CURR_PAGE:
      return {
        ...state,
        currPage: action.page,
      }
    case SET_LOADING:
      return {
        ...state,
        loadingBooks: true,
      }
    default:
      return state;
  }
}

export default rootReducer;
