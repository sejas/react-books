import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'
import BookElement from './BookElement'



class BookSearch extends Component {
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    onClickChangeShelf: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    booksFound: []
  }

  texts = {
    searching: 'Searching',
    notFound: 'Books not found'
  }
  
  textSearching = ''


  updateBooks = (booksFound) => {
    booksFound.map((b)=>{
      let bookI = this.props.books.find((bookToSearch)=>(b.id === bookToSearch.id))
      if (bookI) {
          b.shelf = bookI.shelf
      }
      return null
    })
    this.setState(state => ({booksFound}))
  }
  updateQuery = (query) => {
    query = query.trim()
    this.setState({ query })
    if (query.length >= 3) {
      this.textSearching = this.texts.searching
      BooksAPI.search(query, 20).then((booksFound)=>{
        if (Array.isArray(booksFound)) {
          booksFound = booksFound.sort(sortBy('title'))
          this.textSearching = ''
          this.updateBooks(booksFound)
        }else{
          //Books nound in the server
          this.textSearching = this.texts.notFound
          this.setState(state => ({booksFound: []}))
        }
      })
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { onClickChangeShelf } = this.props
    const { query, booksFound } = this.state
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
          {booksFound.length > 0 && (
            <ol className="books-grid">
              {booksFound.map((book) => (
                <li key={book.id} className='books-list-item'>
                  <BookElement
                    book={book}
                    onClickChangeShelf={onClickChangeShelf}
                  />
                </li>
               ))}
            </ol>
          )}

          {0 === booksFound.length && query.length > 0 && (
            <span className="books-notfound">
              {this.textSearching}
             </span>
          )}
        </div>
      </div>
    )
  }

}

export default BookSearch