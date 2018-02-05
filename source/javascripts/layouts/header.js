//
// header.js
//

class Header {
  constructor () {
    console.log('header.js')

    $(window).on('scroll', function () {
      console.log('scroll')
    })
  }
}

export default Header
