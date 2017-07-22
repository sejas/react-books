import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import BooksList from './BooksList'
import BookSearch from './BookSearch'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log('books')
      this.setState({ books })
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksList
            books={this.state.books}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <BookSearch
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
