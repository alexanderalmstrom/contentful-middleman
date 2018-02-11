//
// application.js
//


import 'babel-polyfill'
import 'application.css.scss'

// Components
import Form from './components/form'
import Button from './components/button'

// Layouts
import './layouts/header'

new Form()
new Button()

// Enable hot module reloading
if (module.hot) {
  module.hot.accept()
}
