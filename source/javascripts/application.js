//
// application.js
//


import 'babel-polyfill'
import 'application.css.scss'

// Components
import Form from './components/form'
import Button from './components/button'

// Layouts
import Header from './layouts/header'

new Form()
new Button()
new Header()

// Enable hot module reloading
if (module.hot) {
  module.hot.accept()
}
