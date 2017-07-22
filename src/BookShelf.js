import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookElement from './BookElement'

class BookShelf extends Component {
  static propTypes = {
    titleShelf: PropTypes.string.isRequired,
  }

  state = {

  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.titleShelf}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            <li>
              <BookElement
              />
            </li>
          </ol>
        </div>
      </div>

    )
  }
}
export default BookShelf