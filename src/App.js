import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import sortBy from 'sort-by'
import BooksList from './BooksList'
import BookSearch from './BookSearch'
import * as BookConstants from './BookConstants'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // console.log('books', JSON.stringify(books))
      this.setState({ books })
    })
  }

  onClickChangeShelf = (book, stateKey, event) => {
    if (stateKey !== book.shelf && BookConstants.states.map((s)=>s.key).indexOf(stateKey) >= 0) {
      //Update in server
      BooksAPI.update(book, stateKey)
      //Update from it is
      book.shelf = stateKey
      //Change in the main state (BooksList)
      let bookToChange = this.state.books.find((b,index)=> b.id === book.id)
      if (bookToChange) {
        // Update UI
        this.setState((state) => {
          bookToChange.shelf = stateKey
          return state
        })
      }else{
        this.setState(state => ({
          books: state.books.concat([ book ]).sort(sortBy('title'))
        }))
      }
    }else{
      //Or book has the same state or is not a valid state.
      //So we don't call to the server
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksList
            books={this.state.books}
            onClickChangeShelf={this.onClickChangeShelf}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <BookSearch
            books={this.state.books}
            onClickChangeShelf={this.onClickChangeShelf}
          />
        )}/>
      </div>
    )
  }

}

export default BooksApp
