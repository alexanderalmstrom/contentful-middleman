# Contentful Middleman

## Requirements

- RVM or/with Ruby 2.4.3 installed.
- Bundler gem
- Middleman gem

## Features

- Webpack dev middleware (bundles and serves files from webpack)
- Webpack hot middleware (hot module reloading, HMR)
- Bundle JS and SCSS files with webpack (overrides Middleman asset pipeline)
- Deployment with Heroku (Heroku CLI)

## Installation

### Install RVM (Ruby Version Manager)

```bash
\curl -sSL https://get.rvm.io | bash -s stable
```

### Install Ruby

```bash
rvm install 2.4.3
```

### Set ruby version

```bash
rvm use 2.4.3
```

### Check ruby version

```bash
ruby -v
```

### Install bundler and gems

```bash
gem install bundler
```

```bash
bundle install
```

### Install middleman

```bash
gem install middleman
```

See the [Middleman docs](https://middlemanapp.com/basics/install/) for more detailed instructions and help if you encounter problems during the install.

## Development

### Run dev server

```bash
yarn run start
```

### Run build

```bash
yarn run build
```

## Enter Contentful API credentials

Rename `.env.example` to `.env` and enter your Contentful API credentials

##  Generate Contentful data yaml files

```bash
middleman contentful
```

## Run local production server

### Install foreman

```bash
gem install foreman
```

### Start foreman

```bash
foreman start
```

## Deploy to Heroku

Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

### Create new Heroku app

```bash
heroku create example
```

### Add buildpacks

```bash
heroku buildpacks:set heroku/ruby
heroku buildpacks:add heroku/nodejs --index 1
```

### Heroku config variables

Add your `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` to Settings > Config Variables in Heroku.

### Run deploy

```bash
yarn run deploy
```
