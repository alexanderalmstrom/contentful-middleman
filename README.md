# Contentful Middleman

## Requirements

- [Homebrew](https://brew.sh/)
- [Yarn](https://yarnpkg.com/)
- Node 8.9.4 (preferably with [NVM](https://github.com/creationix/nvm))
- Ruby 2.4.3 installed (preferably with RVM)
- Bundler gem
- Middleman gem
- Foreman gem

You will find a simplified installation instruction below for Homebrew, NVM, RVM and Ruby gems. I refer to each project documentation if any issues occurs during the setup. Ignore the first steps if you already have the requirements (Homebrew, Yarn, Node and Ruby) installed.

## Features

- Webpack dev middleware (bundles and serves files from webpack)
- Webpack hot middleware (hot module reloading, HMR)
- Bundle JS and SCSS files with webpack (overrides Middleman asset pipeline)
- Deployment with Heroku (Heroku CLI)
- Bourbon (Sass tool set) [https://www.bourbon.io/](https://www.bourbon.io/)
- Bourbon Neat (Sass grid) [https://neat.bourbon.io/](https://neat.bourbon.io/)

## Setup

### Install Homebrew

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Install Yarn

```bash
brew install yarn
```

### Install NVM

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
```

### Install Node

```bash
nvm install 8.9.4
```

### Set Node version

```bash
nvm use v8.9.4
```

### Check Node version

```bash
node -v
```

### Install RVM (Ruby Version Manager)

```bash
\curl -sSL https://get.rvm.io | bash -s stable
```

### Install Ruby

```bash
rvm install 2.4.3
```

### Set Ruby version

```bash
rvm use 2.4.3
```

### Check Ruby version

```bash
ruby -v
```

### Install Bundler and gems

```bash
gem install bundler
```

```bash
bundle install
```

### Install Middleman

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

Rename `.env.example` to `.env` and enter your Contentful API credentials.

##  Generate Contentful data yaml files

```bash
yarn run contentful
```

## Run local production server

### Install foreman

```bash
gem install foreman
```

### Start Foreman

```bash
foreman start
```

## Deploy to Heroku

- Create an Heroku account. [Heroku homepage](https://www.heroku.com/)
- Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

### Create new Heroku app

```bash
heroku create example
```

### Add an existing Heroku app

```bash
heroku git:remote -a example
```

### Add buildpacks

```bash
heroku buildpacks:set heroku/ruby
heroku buildpacks:add heroku/nodejs --index 1
```

### Heroku config variables

```bash
heroku config:set CONTENTFUL_SPACE_ID=space_id
heroku config:set CONTENTFUL_ACCESS_TOKEN=access_token
```

You can also add your `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` under `Settings > Config Variables` in your Heroku application.

### Run deploy

```bash
yarn run deploy
```

or connect to GitHub under `Deploy > Deployment method` and select your branch to do a manual deploy.

### Open your Heroku application in browser

```bash
heroku open
```
