// import axios from 'axios';
var axios = require('axios');


getWikipediaData = (title) => {
  let encodedURI = encodeURI('https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro=&titles=' + title);

  axios.get(encodedURI)
    .then(response => {
      console.log(response.data);
      // return response;

    })
    .catch(error => {
      console.log("Some error happened", error)
    })
}


getWikipediaData('University of Tartu');