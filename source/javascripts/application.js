// application.js

import 'babel-polyfill'
import 'application.css.scss'

import './layouts/header'

// Enable hot module reloading
if (module.hot) {
  module.hot.accept()
}
