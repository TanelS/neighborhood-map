# Neighborhood-map Project

This is a final React project for the Udacity Front-End Web Developer Nanodegree Course. 


## How to use the app
Download the `.zip` file to your computer or clone it:

```git clone https://github.com/TanelS/neighborhood-map```

* install all project dependencies with `npm install` (ensure that [NodeJS](https://nodejs.org/) is installed)
* replace the existing deactivated Google Places JS API key in `./src/App.js` on line `22` with your own key. Google API key can be requested at [Google Cloud Platform Console](https://developers.google.com/maps/documentation/javascript/get-api-key)
* start the development server with `npm start` (or `yarn start` if you have [Yarn](https://yarnpkg.com/en/) installed).
* The application will be opened in your browser at the address: `localhost:3000`
* In order to run the app in the production mode please run `npm run build`. This will create a production build of the app in the `build/` folder in the project directory. For more information regarding running production built please read [React Documetation](https://reactjs.org/docs/optimizing-performance.html)

The app displays a map of Tartu on which number of [University of Tartu](https://www.ut.ee/en) buildings are displayed. The list is not exhaustive because not all University's buildings have Wikipedia page.

The purpose of this project was to build a [React](https://reactjs.org/) app, which gets maps-data from google and relevant information abot the selected placed from some other API. For that purpose [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) was chosen.

To filter the list, enter some text in the `Filter places` form and the list changes accordingly with relevant markers update on the map. Each marker and building name on the left menu is clickable and the pop-up infowindow shows the building article extract.

The app is optimized for viewing on desktop, Google Nexus 5 and Apple smartphones and iPad.