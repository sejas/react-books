import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookElement from './BookElement'

class BookShelf extends Component {
  static propTypes = {
    titleShelf: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onClickChangeShelf: PropTypes.func.isRequired,
  }

  state = {

  }

  render() {
    const { books, onClickChangeShelf } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.titleShelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id} className='books-list-item'>
              <BookElement
                book={book}
                onClickChangeShelf={onClickChangeShelf}
              />
            </li>
           ))}
          </ol>
        </div>
      </div>

    )
  }
}
export default BookShelf