<div align="center">
  <br>
  <img width="300" src="media/logo.svg" alt="rilis.">
  <br>
  <br>
  <br>
  <br>
</div>

> Discover the latest releases on Spotify from your favourite artists

[![Netlify Status](https://api.netlify.com/api/v1/badges/70ea6aff-2810-4cc3-89c2-9c8a909be50a/deploy-status)](https://app.netlify.com/sites/rilis/deploys)

[Rilis](https://rilis.macarie.me/) is a web application built with [Vue.js](https://vuejs.org/) on top of Spotify's web API.

It was created because Spotify does not provide any handy way to browse all the latest releases from the artists you follow.

Rilis targets modern browsers. Older browsers are not considered supported, although some polyfills are generated during the build by Vue CLI.


## Project setup

```
$ yarn install
```


### Compile and hot-reload

Start a web server for development with hot reloading to view the changes made to rilis.

```
$ yarn serve
```

**Note:** the Client ID in `.env.development`, used for development builds, only allows redirects to `localhost:8080`


### Lint

Lint and fix the code.

```
$ yarn lint
```


### Compile

Build a production-ready version of rilis. The compiled files will be located in a new folder named `dist`.

```
$ yarn build --modern
```

**Note:** the Client ID in `.env`, used for production builds, only allows redirects to `rilis.macarie.me`
