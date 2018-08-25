import React, { Component } from "react";

class ListOfObjects extends Component {
  /**
   * Sends the click event to the marker
   */
  triggerClick = (id) => {
    for (let marker of this.props.places) {
      if (id === marker.id) {
        window.google.maps.event.trigger(marker, "click");
      }
    }
  };

  render() {
    return (
      <div className="filter-wrapper">
        <input
          className="search-box"
          aria-label="Filter buildings"
          role="search"
          type="text"
          placeholder="Filter places"
          tabIndex="0"
          onChange={event => this.props.makeQuery(event.target.value)}
        />

        <ul className="object-list"
            aria-label="University buildings list">
          {this.props.places.map(place => (
            <li
              key={place.id}
              className="object-list-item"
              tabIndex="0"
              aria-label="Name of the building"
              onClick={event => {
                this.triggerClick(place.id);
              }}
            >
              {place.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ListOfObjects;
