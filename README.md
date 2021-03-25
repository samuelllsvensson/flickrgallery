# Flickr Gallery

### Install

```node
npm install
npm run build
npm start
```

##### Test

```node
npm test
```

### Technologies used

##### Main

- [**Node.js**](https://nodejs.org/en/)
  The basis for the server implementation
- [**Express**](http://expressjs.com/)
  Very flexible Node framework for running web applications.
- [**Axios**](https://github.com/axios/axios)
  HTTP client which is promise-based, allowing asynchronous requests. I've used it before and was the obvious choice since [request](https://github.com/request/request) is now deprecated.
- [**Sass**](https://sass-lang.com/)
  Sass makes it easy to modularize stylesheets without cluttering, minimize media query code and is easier to read due to its nesting capabilities.

##### Testing

Even though I'm quite new to unit testing, I managed to write some basic tests using:

- [**Jest**](https://jestjs.io/)
  For running tests and accessing expect() assertions as well as mocking an API request
- [**testing-library/jest-dom**](https://github.com/testing-library/jest-dom)
  Provides custom Jest matchers for more declarative and easier to read tests (f.e _toEqual()_, _toBeNull()_ and _toHaveAttribute()_)
- [**jsdom**](https://www.npmjs.com/package/jsdom)
  To use JSDOM class and emulate index.html.

##### Build

- [**Webpack**](https://nodejs.org/en/)
  Used because of its many features and to minify and optimize assets efficiently.
  - [**html-webpack-plugin**](https://github.com/jantimon/html-webpack-plugin)
    Generates a new HTML file in build folder from public/index-template.html.
- [**Babel Loader**](https://github.com/babel/babel-loader)
  Used in conjunction with Babel and Webpack to transpile files.
- [**ESLint**](https://eslint.org/)
  Linter to enforce rules and avoid tab indentation ;)
- [**rimraf**](https://www.npmjs.com/package/rimraf)
  Allows deleting (Unix `rm -rf`) build folder when building new static resources.

##### Other

- [**npm-run-all**](https://www.npmjs.com/package/npm-run-all)
  CLI tool to avoid clutter in the package.json scripts. It is used to run several npm commands sequentially without using '&&' in between.

#### Features

- Fully responsive for mobile (320px) and up

- Server and client communication

- Gallery is independent and doesn't affect other elements.

- API fetching feedback and error handling

- Compatible with latest Chrome, Firefox and Edge versions

##### Bonus features

- Choose how many results to fetch

- Show results in the Stockholm area (radius of 25km from Gamla stan)

- Ability to click on gallery images to display a modal with a caption

- Linting, concatentation and minified static resources created during build

- Some basic tests written for API fetch and DOM elements

- Score of 100 according to the Lighthouse report

#### Description

<sup>Note: This project was developed on Windows.</sub>

The server consists of one route _/gallery_ which wraps the Flickr API. The searched text, amount of results and a bool telling the server if a query needs to be performed is sent as URL parameters _/?search="dog"&results=30&radiusSearch=true_.

When the client has received a response from the server, a thumbnail and original image URL is constructed from the respective source ID, server-ID and secret for every image as mentioned [here](https://www.flickr.com/services/api/misc.urls.html). This is a much safer way than simply using the URL given from using a URL retrieved from the optional configuration parameter "extras" since some images may not have an _url_m_ field for example. This way we ensure that images are always being rendered on the client. Right now, the server fetches images with the _w_ suffix (small image with maximum width of 400px). Flickr responses are by default JSONP format, so we add the parameter _nojsoncallback=1_ to get raw json without a function wrapper.

Since I was only allowed to use Vanilla JS and Sass, a series of functions were implemented which iteratively create DOM elements and appends them to the gallery container upon receiving the data from the server.

Styling is done using Sass. The _/sass_ folder contains several files to keep it organized. I defined mixins for media queries to use within the main.scss file and nested the rest of the styling everything accordingly.

Building the static resources for production usage is done using Webpack. Webpack bundles and concatenates the client code and static assets and creates a _dist_ folder which is then served by Express. Webpack also minifies the code for optimization and Sass compiles a _main.min.css_ in a compressed/minified format.
I'm also using HtmlWebpackPlugin to create a new index.html in _dist_ by using the index-template.html. This template only consists of different js/css script imports relative to the _dist_ folder.

<sup>I tried injecting the imports on build but could not manage to remove the original imports from the newly created html in _dist_. I'm open to hearing if there are any better ways of doing this.</sup>

##### Additional Notes

- I added Font Awesome with CDN to make the search button prettier. I hope this is allowed.
