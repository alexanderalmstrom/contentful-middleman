class Header {
  constructor () {
    $(window).on('scroll', function () {
      console.log('scroll')
    })
  }
}

new Header()

export default Header
