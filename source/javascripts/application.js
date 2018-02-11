//
// application.js
//


import 'babel-polyfill'
import 'application.css.scss'

// Components
import Form from './components/form'
import Button from './components/button'

new Form()
new Button()

// Layouts
import './layouts/header'

// Enable hot module reloading
if (module.hot) {
  module.hot.accept()
}
