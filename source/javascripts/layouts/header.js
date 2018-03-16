//
// header.js
//

const Header = (($) => {
  const Selector = {
    HTML: $('html'),
    BODY: $('body'),
    HEADER: $('#header'),
    POST_HEADER: $('.post-header-container')
  }

  let currentScroll = 0

  $(window).on('scroll', function () {
    currentScroll = $(window).scrollTop()

    if (!Selector.BODY.hasClass('single'))
      return

    if (currentScroll > Selector.POST_HEADER.outerHeight() - (Selector.HEADER.outerHeight() / 2)) {
      Selector.HTML.addClass('state--scrolled')
    } else {
      Selector.HTML.removeClass('state--scrolled')
    }
  })

})(jQuery)

export default Header
