# Weathernaut - A NextJS Weather App

#### NextJS, React Hooks, Redux-Persist, Material-UI, MapBox API, DarkSky API

[LIVE DEMO](https://weathernaut.now.sh)

### Why build this app?

This is the third and final iteration of my React weather dashboard. Although the UI/UX is very similar to v2.0, the entire app was rewritten to utilize [NextJS] (https://nextjs.org/) and all the greatness that comes with server side rendering.

The main point of rebuilding this app was to refine the initial codebase into something that I would want an employer to see.

* The UI was created with [Material-UI](https://material-ui.com/)
* The charts are made with [Recharts](https://https://recharts.org/en-US/).
* The weather icons were created by [Lance Snider](https://codecanyon.net/user/dxc).

### What's different?

Version 3: [Weathernaut](https://weathernaut.now.sh)
* New name! "Umbrallapp" sounded like vomit. "Weathernaut" has a nice quirky ring to it.
* All source code has been completely refactored to be modular, easy to read, well commented, and very maintainable.
* Dynamic page based routing with NextJS.
* Replaced the large useReducer hook with by wapping the entire up with a Redux wrapper.
* Implementation of serverless functions to protect API keys.
* Material-UI custom theming makes changing the look and feel of the app as simple as changing two variables.
* State will persist (per session) on page reload with redux-persist.
* Many small improvements with the UI/UX.

Version 2: [umbrellapp](https://umbrellapp.now.sh/)
* I wanted to learn how to use React Hooks, so I remade the app.
* After searching for a solid React styling library to make the UI, I settled on Material UI React. I love their documentation.
* I learned the basics of useEffect, useState, and useReducer.

Version 1: [redux-weather](https://redux-weather.now.sh/)
* Proof of concept of utilizing both MapBox and DarkSky's API's to make a better weather app than using openweathermap.org
* Design was loosely based off the UI from the iPhone weather app.
* I made this to remind myself how to use react and redux.
* No hooks or styling libraries.
