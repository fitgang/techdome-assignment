# Assignment by Ayush Gupta

## Backend
- This nodejs application is made with HTML, CSS, Javascript.
- Express is used for routing.
- Embedded Javascript (EJS) is used as templating engine to generate server side rendered HTML.
- 'node-fetch' module is used to fetch data from api on the server.
- This application is deployed on heroku.

## Frontend
- The functionalities on the frontend are implemented using vanillaJS.
- Components are created by functions to populate the DOM after an api call.
- On clicking on any off the same filter, that filter is applied, the visual of the filter changes on applying and removing the filter.
- This is a single page application(SPA).
- History api is used to change the url in the location bar.
- On api calls, the page does not refresh.
- The filters applied can be seen in the url.

## Performance
- Scripts and styles used are minified.
- 'preconnect' is used with link tags to fetch styles faster.
- Script is imported after the initial rendering of DOM with styles completes.

### On Mobile
![mobile lighthouse performance](/public/img/mobile.jpg "mobile lighthouse performance")

### On Desktop
![desktop lighthouse performance](/public/img/desktop.jpg "desktop lighthouse performance")