import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as BookConstants from './BookConstants'


class BookElement extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onClickChangeShelf: PropTypes.func.isRequired,
  }

  state = {

  }

  render() {
    const { book, onClickChangeShelf } = this.props
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.smallThumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf || 'none'} onChange={(e)=>onClickChangeShelf(book, e.target.value, e)}>
                <option value="move" disabled>Move to...</option>
                {BookConstants.states.map((state)=> (
                  <option key={state.key} value={state.key}>{state.title}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors.join(", ")}</div>
        </div>
    )
  }
  
}
export default BookElement