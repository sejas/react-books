import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import * as BookConstants from './BookConstants'

class BooksList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onClickChangeShelf: PropTypes.func.isRequired,
  }

  state = {

  }

  filterBooks = (key) => {
    return (e) => {
      return e.shelf === key
    }
  }

  render() {
    const { books, onClickChangeShelf } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {BookConstants.states.map((state)=>(
                <BookShelf key={state.key}
                  titleShelf={state.title}
                  books={books.filter(this.filterBooks(state.key))}
                  onClickChangeShelf={onClickChangeShelf}
                  />
             ))}
            }
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}
export default BooksList