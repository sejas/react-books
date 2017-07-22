import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
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

  showingShelfStates = BookConstants.states.filter((s)=>(s.showAsShelfSection))

  render() {
    const { books, onClickChangeShelf } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.showingShelfStates.map((state)=>(
                <BookShelf key={state.key}
                  titleShelf={state.title}
                  books={books.filter(this.filterBooks(state.key)).sort(sortBy('title'))}
                  onClickChangeShelf={onClickChangeShelf}
                  />
             ))}
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            className='search'
          >Add a book</Link>
        </div>
      </div>
    )
  }
  
}
export default BooksList