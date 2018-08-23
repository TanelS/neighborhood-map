import * as MyPoints from './MyPoints';
import axios from 'axios'; 

export const getAll = () => MyPoints;

export const  getWikipediaData = function(title)  {
  let encodedURI = encodeURI('https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + title);
  return axios.get(encodedURI).then(function (response) {
    // console.log('response', response);
    let pages = response.data.query.pages;
    let pageid = Object.keys(pages)[0];
    let shortData = pages[pageid].extract;
    return shortData;
    })
    .catch( function(error) {console.log(error)})
  ;
}

