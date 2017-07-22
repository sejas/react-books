import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookElement from './BookElement'



class BookSearch extends Component {
  static propTypes = {
    onClickChangeShelf: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    query = query.trim()
    this.setState({ query })
    if (query.length >= 3) {
      console.log('searching query +3: ',query)
      BooksAPI.search(query, 20).then((books)=>{
        console.log('books',books)
        if (Array.isArray(books.sort(sortBy('title')))) {
          this.setState(state => ({books}))
        }
      })
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { onClickChangeShelf } = this.props
    const { query, books } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
            type="text"
            placeholder="Search by title or author"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
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

export default BookSearch