import React, { Component } from 'react';


class ListOfObjects extends Component {

  triggerClick = (id) => {
    for (let marker of this.props.places) {
      if (id === marker.id) {
        window.google.maps.event.trigger(marker, 'click')
      }
    }
  }

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
            <li key={place.id} className='object-list-item' 
            onClick = {
              (event) => 
              {this.triggerClick(place.id)}
            }>
              <p>{place.title}</p>
            </li>
          ))}
        </div>
      </div>
    )
  }

}

export default ListOfObjects;