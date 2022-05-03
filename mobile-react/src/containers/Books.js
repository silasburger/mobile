import {Component} from 'react';
import {connect} from 'react-redux';
import { getBooks, setCurrPage } from '../actions';
import BookTable from '../components/BookTable';
import PaginationNav from '../components/PaginationNav';
import './Books.css';
import PropTypes from 'prop-types';


class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    /**
     * On mount grabs the page from query parameters, or if it undefined assigns it to 1
     * it formats the url to always go to /books?page= and add the correct page number
     * it gets books using the page number grabbed from query parameters
     * it sets the current page in redux, which will be use as source of truth moving forward
     */
    componentDidMount() {
        console.log('cdm run');
        const qParams = new URLSearchParams(window.location.search)
        const page = +qParams.get('page') || 1
        window.history.replaceState( {} , '', '/books?page=' + page);
        this.props.getBooks(page);
        this.props.setCurrPage(page);
    }

    
    componentDidUpdate(prevProps) {
        if(prevProps.currPage !== 0 && prevProps.currPage !== this.props.currPage) {
            this.props.getBooks(this.props.currPage);
        }
    }

    /**
     * displays the table or headers that explain why no books are showing
     */
    renderBookTable = () => {
        const lastPage = Math.ceil(this.props.bookCount / 20) // could memoize this calculation
        if (this.props.loadingBooks) {
            return <h1>Loading...</h1>; 
        }
        else if (this.props.currPage > lastPage || this.props.books.length === 0) {
            return <h1>Sorry, no more books</h1>;
        } 
        else {
            return (<BookTable books={this.props.books} />);
        }
    }

    render() {
        return (
            <div className='book-viewer'>
                <div className="book-table-wrapper" >
                    {this.renderBookTable()}
                </div>
                <PaginationNav currPage={this.props.currPage} bookCount={this.props.bookCount} turnPage={this.props.setCurrPage} />
            </div>
        );
    }
}

Books.propTypes = {
    books: PropTypes.array,
    bookCount: PropTypes.number,
    currPage: PropTypes.number,
    loadingBooks: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    books: state.books,
    bookCount: state.bookCount,
    currPage: state.currPage,
    loadingBooks: state.loadingBooks,
});

export default connect(mapStateToProps, { getBooks, setCurrPage })(Books);
