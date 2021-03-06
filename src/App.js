import React, { Component } from "react";
import * as LocalAPI from "./LocalAPI";
import ListoOfObjects from "./ListOfObjects";
import escapeRegExp from "escape-string-regexp";

class App extends Component {
  state = {
    query: "",
    map: "",
    places: [],
    activeMarker: {},
    placeInfo: ""
  };

  componentDidMount() {
    this.getGoogleMap();
  }

  getGoogleMap = () => {
    window.initMap = this.initMap;
    loadJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCvlfWqbR5h6Grp32libqaK6el_gf27wcU&v=3&callback=initMap"
    );
    
    /**
     * If there is a problem with authentication. Information came from:
     * https://developers.google.com/maps/documentation/javascript/events#auth-errors
     */
    window.gm_authFailure = function() { 
      alert('Cannot load Google Maps! Please ensure that you have a valid Google Maps API key! Please go to https://developers.google.com/maps/documentation/javascript/get-api-key')
      }
  };

  initMap = () => {
    let initMapContext = this;
    let positions = [];

    const match = new RegExp(escapeRegExp(this.state.query), "i");
    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 58.377736, lng: 26.725021 },
      zoom: 15
    });

    // code for the places filter.

    let MyPoints = this.state.query
      ? LocalAPI.getAll().filter(place => match.test(place.title))
      : LocalAPI.getAll();

    let infoWindow = new window.google.maps.InfoWindow(
      { maxWidth: 310 } // defaults changed to accommodate smaller screens
    );

    // a loop for creating the markers for later adding them
    // to the state
    for (let place of MyPoints) {
      let id = place.id;
      let title = place.title;
      let coordinates = place.location;
      let marker = new window.google.maps.Marker({
        id: id,
        map: map,
        position: coordinates,
        title: title,
        animation: window.google.maps.Animation.DROP
      });

      positions.push(marker);

      marker.addListener("click", function() {
        initMapContext.setActiveMarker(marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        initMapContext
          .getActiveMerkerInfo(marker)
          .then(response =>
            initMapContext.populateInfoWindow(this, infoWindow, map)
          );
      });
    }

    this.setState({ places: positions });
    this.setState({ map });
  };

  /**
   * Sets the clicked marker active
   */
  setActiveMarker = marker => {
    this.setState({ activeMarker: marker });
  };

  /**
   * Gets the promise back from Wikipedia API
   */
  getActiveMerkerInfo = marker => {
    return LocalAPI.getWikipediaData(this.state.activeMarker.title).then(
      response => {
        this.setState({ placeInfo: response });
      }
    );
  };

  /**
   * Changes the query string. Mere query-string change does not
   * force refresh, thus callback function is added. The hint came from
   * https://medium.learnreact.com/setstate-takes-a-callback-1f71ad5d2296
   */
  changeQuery = querystring => {
    this.setState({ query: querystring.trim() }, () => this.initMap());
  };

  /**
   * populates the infoWindow. the solution os based on the
   * lesson's example
   */
  populateInfoWindow = (marker, infowindow, map) => {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent(
        "<div>" +
          "<h3 tabIndex=\"0\">" +
          "A short description" +
          " - " +
          marker.title +
          "</h3>" +
          "<div tabIndex=\"0\">" +
          this.state.placeInfo +
          "</div>" +
          "<div>" +
          "<hr>" +
          "<h5 tabIndex=\"0\">" +
          "Source: Wikipedia" +
          "</h5>" +
          "</div>"
      );

      if (marker.setAnimation()) {
        setTimeout(function() {
          marker.setAnimation(null);
        }, 400);
      }

      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener("closeclick", function() {
        infowindow.setMarker = null;
      });
    }
  };

  render() {
    return (
      <div className="App">
        <ListoOfObjects
          places={this.state.places}
          makeQuery={this.changeQuery}
        />
        <div id="map"
             aria-label="Map of Tartu University buildings"
             role="application"
        />
      </div>
    );
  }
}

/**
 * Builds the necessary DOM. Inspiration came from
 * https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
 * @param {String} src
 */
function loadJS(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true;
  script.onerror = (e) => {
    alert('There is a problem accessing Google maps, please check your network connectivity.');
    console.log("An error occurred, details:", e);
  };
  ref.parentNode.insertBefore(script, ref);
}

export default App;
