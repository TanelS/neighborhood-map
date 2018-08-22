import React, { Component } from 'react';


class ListOfObjects extends Component {
  render() {
    return (
      <div className='filter-wrapper'>

        <input
          className='search-box'
          type='text'
          placeholder='Filter places'
        onChange={(event) => this.props.makeQuery(event.target.value)}
        />

        <div className='object-list'>
          {this.props.places.map((place) => (
            <li key={place.id} className='object-list-item'>
              <p>{place.title}</p>
            </li>
          ))}
        </div>
      </div>
    )
  }

}

export default ListOfObjects;