import * as uuid from 'uuid';
import PropTypes from 'prop-types';

/**
 * A dumb presentational component that renders the book data
 * @returns HTML5 table element filled with book data
 */
const BookTable = ({books}) => {
    const headers = books.length ? Object.keys(books[0]) : [];

    const renderTableHeader = () => {
        return (
            <tr>
                {headers.map(header => {
                    return (<th key={uuid.v4()}>{header}</th>);
                })}
            </tr>
        )
    }

    const renderTableBody = () => {
        return books.map((book) => {
            return (
                <tr key={uuid.v4()}>
                    {headers.map(header => <td key={uuid.v4()}>{book[header]}</td>)}
                </tr>
            );
        });
    }


    return (
        <table>
            <thead>
                {renderTableHeader()}
            </thead>
            <tbody>
                {renderTableBody()}
            </tbody>
        </table>
    )
}

BookTable.propTypes = {
    books: PropTypes.array,
}

export default BookTable;