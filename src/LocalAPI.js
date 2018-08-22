import * as MyPoints from './MyPoints';
import axios from 'axios'; 

export const getAll = () => MyPoints;

export const  getWikipediaData = function(title)  {
  let encodedURI = encodeURI('https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + title);
  return axios.get(encodedURI).then(function (response) {
      return response.data.query;
    }).catch( function(error) {console.log(error)})
  ;
}