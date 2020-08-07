## Table of Contents

- [Project History](#project-history)
  - [Iteration 1: redux-weather](#iteration-1-redux-weather)
  - [Iteration 2: Umbrellapp](#iteration-2-Umbrellapp)
  - [Iteration 3: Weathernaut](#iteration-3-Weathernaut)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Project History

Weathernaut is the *third* iteration of a weather app that I made back in March 2020.

>**NOTE**
>In this first section, I'll be discussing the two iterations before Weathernaut, so if you're looking for Weathernaut-specific information, use the table of contents above to get where ever you want to be.

### Iteration 1 redux-weather
###### [LIVE DEMO](https://redux-weather.now.sh/) | [SOURCE CODE](https://github.com/stevendelro/redux-weather)

When the pandemic hit America, I decided to hit the keyboard. It had been a few months since I even attempted to code anything, so I was pretty rusty. The first order of business was to make an app that grabs data from an external API. So of course, a weather app fit the bill perfectly.

This single function was the crux of that project. It did two things:

```
// User types in anything and fires off a call to the MapBox API to
// retrieves a best match place name and proper coordinates.
axios
  .get(mapBoxUrl)
  .then(async geocodeData => {
    const long = geocodeData.data.features[0].center[0]
    const lat = geocodeData.data.features[0].center[1]
    const place = geocodeData.data.features[0].place_name

    // Then, those coordinates are sent to the Dark Sky API to retrieve
    // weather data
    await axios
      .get(`${proxy}${darkSkiesUrl}${lat},${long}?exclude=flags`)
      .then(request => {
        const weatherData = request.data
        dispatch(displayedPlace(place))
        dispatch(fetchWeatherSuccess(weatherData))
      })
      .catch(error => console.log('Error making darksky call: ', error))
  })
  .catch(error => console.log('Error making geocode call: ', error))
```
Once I got the data coming in, I incorporated redux in order to manage app state.

I've made apps in the past with redux once before, so this time it wasn't too difficult. All the stateful components in this app were still class based, so there wasn't anything really groundbreaking. I was still really proud of it though.

It had been a long time since I made anything, so I was pretty stoked.

I even made a gif:

![](https://arbletur.sirv.com/demo.gif)


### Iteration 2 Umbrellapp
###### [LIVE DEMO](https://umbrellapp.now.sh/) | [SOURCE CODE](https://github.com/stevendelro/react-weather-dashboard)

Sweet. So I got all caught up with my old React skills. The next order of business was to wrap my head around React Hooks.

#### Thought Process

Initially, I thought that I should make a completely different type of app.

I mean, I was so tired of looking at the same code. But, I restrained myself. I needed to make things easier for me, not more difficult--regardless if the difficult route would ultimately bear more fruits of knowledge. The goal right now wasn't knowledge accumulation. I need to keep myself focused on the very specific goal of *producing* finished work.

So, at a bare minimum, what could take this weather app to the next level?

* The app looks horrible. I definitely need to implement some kind of solution to address the looks.
* Doing a complete rewrite with React Hooks would be much easier now, since the majority of the logic was already figured out.
* There was *a ton* of unused data leftover that I havent used. I should defnitely do something with that data.

With that in mind, I did some research. I read blogs, I looked through subreddits, I even looked at the projects that some of my favorite Udemy instructors were working on or had recently produced in their tutorials. I decided that I really liked the Material UI documentation. Some of it was over my head, but I could figure it out.

After spending some time looking in-depth at their documentation, I came across their boilerplate templates and something about the dashboard example popped out at me. I thought that the best way to use the unused data would be to make it visual. And just like that: I was going to remake the project as a Material UI dashboard, where the main visual components would be charts made with the Recharts charting library.

For a little extra kick, I decided to implement the browser's Geolocation API in order to get the users permission to automatically fetch weather data based on their location. That came with a slew of unforeseen issues, from handling user denial, to understanding how to get the Geolocation API to play nicely with promises and asynchronous data fetches.

Little did I know how much I would be customizing and understanding the Material-UI ecosystem. Seeing how they implement their own components really made an impact on how I approached writting my code.

What resulted from that was, Umbrellapp:

![](https://arbletur.sirv.com/gifs/umbrellapp15fps.gif)

### Iteration 3 Weathernaut
###### [LIVE DEMO](https://weathernaut.now.sh/) | [SOURCE CODE](https://github.com/stevendelro/Weathernaut)

Umbrellapp was so rewarding to create and finish. It, by far, was the most professional looking thing I've ever created. But, we need to go deeper.

Following the same thought process that led me to creating Umbrellapp, how could I incrementally add to this project? How can I build on top of what I've already made, in order to produce something exponentially better than the previous project?

#### Thought Process

With a newfound sense of confidence, I was comfortable with using stateful functional components with React hooks. And, I felt comfortable using Material UI as my current styling library of choice.

What else can I do to take this just a little further? How can I incrementally build on top of what I just made, in order to make something that's much better than the original project?

While building these projects, I would reference certain Udemy tutorials to help get me through some sticking points. My original plan after Umbrellapp was to learn and understand all the hype around Gatsby. Static sites were impressively fast, so I wanted in on that goodness. But, while coding along with Reed Barger on Udemy, I was introduced to NextJS.

NextJS had just released 9.3 where they offered next-gen static site generation support, along side it's ability to provide server side rendering. Plus, the Vercel platform (formally Zeit) had the best developer experience I've had thus far. Sure, I'm a budding developer and don't really have much experience to give that last sentence any weight, but hey, first impressions matter.

Some of Umbrellapp's downsides:

* It's codebase is horribly disorganized. The main Dashboard component has 349 lines of code.
* I didn't put that much focus on what it would feel like to come back to this project after a year. The main goal was just to make the thing look cool and work.
* I was so focused on understanding how to use Material UI's components, that I didn't really pay attention to some pretty big UI flaws that were occurring on the front end.
* As a single page app, the API key was exposed for anyone to take and use as they please.

There's many more. Trust me. Yeah, the app looks light years better than the original, but only to my friends and family. If you actually look at the code from a developer's prespective, it's pretty hacky.

So, after having been exposed to NextJS from a Udemy tutorial, I decided that I would use their framework to rebuild my weather app. The intention now, would be that of refinement. All the major parts were there, all I needed to do was port everything over, right?

NextJS makes you think about building React apps in such a different way. First of all, it has page based routing, which was new to me. Apparently, this was what made PHP so alluring and nice to work with. Also, there's no complicated setup and right out of the box you get cool features like automatic code spitting for each route.

Some key points about the building of Weathernaut:

* All source code has been completely refactored to be modular, easy to read, well commented, and very maintainable.
* Dynamic page based routing with NextJS.
* Replaced the large useReducer hook with by wapping the entire up with a Redux wrapper.
* Implementation of serverless functions to protect API keys.
* Material-UI custom theming makes changing the look and feel of the app as simple as changing two variables.
* State will persist (per session) on page reload with redux-persist.
* Many small improvements with the UI/UX.

And of course, a gif for you:

![](https://arbletur.sirv.com/gifs/weathernaut.gif)


## Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.

- [NextJS](https://nextjs.org) -- An opinionated create-react-app
- [ReactJS](https://reactjs.org) -- A Javascript library for building user interfaces.
- [Material UI](https://material-ui.com) -- A React component-based design system.
- [Styled Components](https://styled-components.com/) -- Visual primited for the component age.
- [Recharts](https://recharts.org/en-US/) -- A composable charting library built on React components.
- [MapBox API](https://www.mapbox.com/) -- Rich accurate map data. Used to turn location names into coordinates.
- [Dark Sky API](https://darksky.net/) -- A once open sourced database for weather information.
- [react-map-gl](https://visgl.github.io/react-map-gl/) -- WebGL-powered React suite for displaying maps.
- [redux-thunk](https://github.com/reduxjs/redux-thunk) -- middleware allows you to write action creators that return a function instead of an action.
- [next-redux-wrapper](https://github.com/kirill-konshin/next-redux-wrapper) -- A HOC that brings Next.js and Redux together
- [redux-persist](https://github.com/rt2zz/redux-persist) -- Persist and rehydrate a redux store after a browser refresh.
- [Sirv](https://sirv.com/) -- This was the image CDN hosting provider that I used to host the gifs for the readme.

## Getting Started

> **NOTE**
> The Darksky API was just acquired by Apple, so unfortunately, they are no longer accepting API signups for new API keys. On March 31st, 2020: *"Our API service for existing customers is not changing today, but we will no longer accept new signups. The API will continue to function through the end of 2021. As part of this transition, use of Dark Sky by Apple is subject to the Apple Privacy Policy, which can be found at apple.com/privacy."*

### Prerequisites

1. You'll need a MapBox API key. Sign up to get one [here](https://account.mapbox.com/auth/signin/).
2. ~~You'll need a DarkSky API key~~ **No longer available.**

*A future update will replace the Darksky API with weatherstack.com, stay tuned.)*

### Installation

1. Clone the repo

```
git clone https://github.com/stevendelro/Weathernaut.git
```

2. Install NPM packages

```
yarn
```

3. Create a `.env.local` file in the project root directory (right next to your package.json) and add the following declarations:

```
MAPBOX_KEY=pk.eyJ1Ijoic3RldmVuZGVscmjlh3Q0In0c.EUeki9FFRcyDIirOGn26vw9zYXJpbyIsImEiOiJjanl2Zndp2lta2xyNbmwwb3p3M
DARKSKY_KEY=7601daeb3e11b6f49672afaebbb45cc1

// Note: These specific keys have been scrambled.
```

4. Build it:

```jsx
yarn build
```


5. Fire it up:

```jsx
yarn start
```
6. Head over to `localhost:3000` and see it in action.

## Usage

1. The app will ask for your permission to use your browser's geolocation coordinates. If you accept, it will automatically fetch your local weather data. If you deny, you will be presented with a search bar.
2. Search for weather.
3. Find out whether or not *(get it?)* you'll need an umbrella.

## Roadmap

1. Due to DarkSky closing down it's API for open source usage, I will be updating the app to utilize weatherstack.com's API. Tentative date of completion is to be determined.

## Contributing

If you want to contribute to this project, I'm all for it!

1. Fork the Project
2. Create your Feature Branch `git checkout -b feature/AmazingFeature`
3. Commit your Changes `git commit -m 'Add some AmazingFeature'`
4. Push to the Branch `git push origin feature/AmazingFeature`
5. Open a Pull Request

## License

Distributed under the LIC License. Do whatever you want with it.

## Contact

Steven Del Rosario - [@steveDelRosario](https://twitter.com/stevenDelRosario) - stevendelro@pm.me

Project Link: [https://github.com/stevendelro/Weathernaut](https://github.com/stevendelro/Weathernaut)

## Acknowledgements

> I wouldn't have been able to learn how to code without the courses and tutorials that more experienced developers have made. Talk down all you want about Udemy, but having someone tailor an experience as intimate as 20+ hour one-on-one session for just about ten bucks is just unbeatable.

- [Andrew Mead's Udemy Courses](https://mead.io/) -- Udemy
- [Stephen Grider's Udemy Courses](https://rallycoding.com/) -- Udemy
- [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller/) -- Udemy
- [Reed Barger](https://www.udemy.com/user/reed-barger/) -- Udemy
- [Thomas Weibenfalk](https://www.udemy.com/user/thomas-928/) -- Udemy
- [Tyler McGinnis](https://ui.dev/courses/) -- Personal Website
- [Codevolution](https://www.youtube.com/c/Codevolution/) -- Youtube
- [Front-End Masters](https://frontendmasters.com/courses/) -- Lecture format talks with industry leaders.
