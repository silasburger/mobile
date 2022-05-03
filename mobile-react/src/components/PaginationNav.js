import { Link } from "react-router-dom";
import * as uuid from 'uuid';
import PropTypes from 'prop-types';

/**
 * Links that trigger an ajax call on click, which loads a new batch of books
 */
const PaginationNav = ({bookCount, turnPage, currPage}) => {
    const lastPage = Math.ceil(bookCount / 20);
    return (
        <div className='pagination'>
            {
                currPage !== 1 
                    ? <Link to={'/books?page=' + (currPage - 1)} onClick={() => turnPage(currPage - 1)}>Prev</Link> 
                    : undefined 
            } 
            {
                [1,2,3,4,5].map(v => 
                    <Link to={'/books?page=' + v} key={uuid.v4()} onClick={() => turnPage(v)}>{v}</Link>
                )
            }
            <Link to={'/books?page=' + (currPage + 1)} onClick={() => turnPage(currPage + 1)}>Next</Link> 
            <Link to={'/books?page=' + lastPage} onClick={() => turnPage(lastPage)}>Last</Link> 
        </div>
    )
}

PaginationNav.propTypes = {
    bookCount: PropTypes.number,
    turnPage: PropTypes.func,
    currPage: PropTypes.number,
}

export default PaginationNav;