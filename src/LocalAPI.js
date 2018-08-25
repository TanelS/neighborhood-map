import * as MyPoints from './MyPoints';
import axios from 'axios';

/**
 * API for enabling accedd to the local JSON file. decided it would
 * be nice to have a separate component
 */
export const getAll = () => MyPoints;


/**
 * Queries the Wikipedia API and returns a promise
 * @param {String} title 
 */
export const getWikipediaData = function (title) {
  const encodedURI = encodeURI('https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + title);
  return axios.get(encodedURI).then(function (response) {
      // console.log('response', response);
      const pages = response.data.query.pages;
      const pageid = Object.keys(pages)[0];
      const shortData = pages[pageid].extract;
      return shortData;
    })
    .catch(function (error) {
      console.log(error)
    });
}