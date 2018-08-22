import React, { Component } from "react";
import * as LocalAPI from './LocalAPI';
import ListoOfObjects from './ListOfObjects';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {
  state = {
    query : '',
    map : '',
    places : [],
    // mapOpen: true,
    mapOpen : false,
    placeInfo : ''
  };

  componentDidMount() {
    this.getGoogleMap();
  }
  
  getGoogleMap = () => {
    window.initMap = this.initMap;
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyCvlfWqbR5h6Grp32libqaK6el_gf27wcU&v=3&callback=initMap");
  }

  initMap = () => {
    let positions = [];
    const match = new RegExp(escapeRegExp(this.state.query), 'i');
    let map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 58.377736, lng: 26.725021 },
      zoom: 13
    });

    let MyPoints = (this.state.query) ?
      (LocalAPI.getAll().filter((place) => match.test(place.title)))
      : (LocalAPI.getAll());  

    let infoWindow = new window.google.maps.InfoWindow();

    for (let place of MyPoints) {
      let info = getInfoFromWikipedia(place.title);
      console.log('info:', info);
      let id = place.id;
      let title = place.title;
      let coordinates = place.location;
      let marker = new window.google.maps.Marker({
        id: id,
        map: map,
        position: coordinates,
        title: title,
        animation: window.google.maps.Animation.DROP
      })

      positions.push(marker); 

      marker.addListener('click', function () {
        populateInfoWindow(this, infoWindow);
      });
    }
    
    // from the course
    function populateInfoWindow(marker, infowindow) {
      // Check to make sure the infowindow is not already opened on this marker.
      // let contentString = marker.title;
      if (infowindow.marker !== marker) {
        infowindow.marker = marker;
        // infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.setContent('<div>' + getInfoFromWikipedia(marker.title) + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick',function(){
          infowindow.setMarker = null;
        });
      }
      
    }

    function getInfoFromWikipedia(title) {
      return LocalAPI.getWikipediaData(title).then(
        function(response) {
          let pageid = Object.keys(response.pages)[0];
          let wpExtract = response.pages[pageid].extract;
          // console.log(wpExtract);
          return wpExtract;
        }
      )
    }
    

    this.setState({places : positions})
    this.setState({ map });

  };


  // callback function idea: 
  // https://medium.learnreact.com/setstate-takes-a-callback-1f71ad5d2296
  // otherwise state change does not trigger refresh
  changeQuery = (querystring) => {
    this.setState({query : querystring.trim()}, () => this.initMap());
  }


  
  render() {
    return (
      <div className="App">
          <ListoOfObjects 
            places = {this.state.places} 
            makeQuery = {this.changeQuery}
          />
          <div id="map"></div>
      </div>
    );
  }
}

// The following function is from:
// https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/
function loadJS(src) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  script.defer = true; // TODO: kas on vaja?
  script.onerror = () => {console.log("An error occurred")}
  ref.parentNode.insertBefore(script, ref);
}

export default App;
