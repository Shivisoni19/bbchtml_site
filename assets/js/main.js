$(function () {
  'use strict'

  // Global variables
  var $win = $(window)

  /*==========  Pre Loading   ==========*/
  setTimeout(function () {
    $('.preloader').remove()
  }, 2000)

  /*==========   Mobile Menu   ==========*/
  // $('.navbar-toggler').on('click', function () {
  //     $('.navbar-collapse').addClass('menu-opened');
  // })

  $(document).ready(function () {
    /*==========   Mobile Menu   ==========*/
    $('.navbar-toggler').on('click', function () {
      console.log('Navbar toggler clicked') // Check if this message appears in the console
      $('.navbar-collapse').addClass('menu-opened')
    })

    $('.close-mobile-menu').on('click', function (e) {
      console.log('Close mobile menu clicked') // Check if this message appears in the console
      $('.navbar-collapse').removeClass('menu-opened')
    })
  })

  /*==========   Sticky Navbar   ==========*/
  $win.on('scroll', function () {
    if ($win.width() >= 992) {
      var $navbar = $('.sticky-navbar')
      if ($win.scrollTop() > 200) {
        $navbar.addClass('is-sticky')
      } else {
        $navbar.removeClass('is-sticky')
      }
    }
  })

  /*==========  Open and Close Popup   ==========*/
  // open Popup
  function openPopup (popupTriggerBtn, popup, addedClass, removedClass) {
    $(popupTriggerBtn).on('click', function (e) {
      e.preventDefault()
      $(popup).toggleClass(addedClass, removedClass).removeClass(removedClass)
    })
  }
  // Close Popup
  function closePopup (closeBtn, popup, addedClass, removedClass) {
    $(closeBtn).on('click', function () {
      $(popup).removeClass(addedClass).addClass(removedClass)
    })
  }
  // close popup when clicking on an other place on the Document
  function closePopupFromOutside (
    popup,
    stopPropogationElement,
    popupTriggerBtn,
    removedClass,
    addedClass
  ) {
    $(document).on('mouseup', function (e) {
      if (
        !$(stopPropogationElement).is(e.target) &&
        !$(popupTriggerBtn).is(e.target) &&
        $(stopPropogationElement).has(e.target).length === 0 &&
        $(popup).has(e.target).length === 0
      ) {
        $(popup).removeClass(removedClass).addClass(addedClass)
      }
    })
  }

  openPopup('.action__btn-search', '.search-popup', 'active', 'inActive') // Open Search popup
  closePopup('.search-popup__close', '.search-popup', 'active', 'inActive') // Close Search popup
  openPopup('.action__btn-cart', '.cart-minipopup', 'active', 'inActive') // Open Search popup
  closePopupFromOutside(
    '.cart-minipopup',
    '.cart-minipopup',
    '.action__btn-cart',
    'active'
  ) // close popup when clicking on an other place on the Document

  /*==========   Scroll Top Button   ==========*/
  var $scrollTopBtn = $('#scrollTopBtn')
  // Show Scroll Top Button
  $win.on('scroll', function () {
    if ($(this).scrollTop() > 700) {
      $scrollTopBtn.addClass('actived')
    } else {
      $scrollTopBtn.removeClass('actived')
    }
  })
  // Animate Body after Clicking on Scroll Top Button
  $scrollTopBtn.on('click', function () {
    $('html, body').animate(
      {
        scrollTop: 0
      },
      500
    )
  })

  /*==========   Set Background-img to section   ==========*/
  $('.bg-img').each(function () {
    var imgSrc = $(this).children('img').attr('src')
    $(this)
      .parent()
      .css({
        'background-image': 'url(' + imgSrc + ')',
        'background-size': 'cover',
        'background-position': 'center'
      })
    $(this).parent().addClass('bg-img')
    if ($(this).hasClass('background-size-auto')) {
      $(this).parent().addClass('background-size-auto')
    }
    $(this).remove()
  })

  /*==========   Add active class to accordions   ==========*/
  $('.accordion__item-header').on('click', function () {
    $(this).parent('.accordion-item').addClass('opened')
    $(this).parent('.accordion-item').siblings().removeClass('opened')
  })
  $('.accordion__item-title').on('click', function (e) {
    e.preventDefault()
  })

  /*==========   Load More Items  ==========*/
  function loadMore (loadMoreBtn, loadedItem) {
    $(loadMoreBtn).on('click', function (e) {
      e.preventDefault()
      $(this).fadeOut()
      $(loadedItem).fadeIn()
    })
  }

  loadMore('.loadMoreportfolio', '.portfolio-hidden > .portfolio-item')

  /*==========   Slick Carousel ==========*/
  $('.slick-carousel').slick()

  $('.slider-with-navs').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dots: true,
    asNavFor: '.slider-nav'
  })
  $('.slider-nav').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.slider-with-navs',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: '50px',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  })

  /*----------  slick Carousel with Filter  ----------*/
  $('#slick-filter-buttons .nav__link').on('click', function (e) {
    e.preventDefault()
    $(this).addClass('active').siblings().removeClass('active')
    var key = '.' + $(this).data('value')

    $('#filter-carousel').slick('slickUnfilter')
    $('#filter-carousel').slick('slickFilter', key).slick('refresh')
    $('#filter-carousel').slick('slickGoTo', 0)
  })

  /*==========  Popup Video  ==========*/
  $('.popup-video').magnificPopup({
    mainClass: 'mfp-fade',
    removalDelay: 0,
    preloader: false,
    fixedContentPos: false,
    type: 'iframe',
    iframe: {
      markup:
        '<div class="mfp-iframe-scaler">' +
        '<div class="mfp-close"></div>' +
        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
        '</div>',
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: 'v=',
          src: '//www.youtube.com/embed/%id%?autoplay=1'
        }
      },
      srcAction: 'iframe_src'
    }
  })
  $('.popup-gallery-item').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  })

  /*==========   counterUp  ==========*/
  $('.counter').counterUp({
    delay: 10,
    time: 4000
  })

  /*==========  NiceSelect Plugin  ==========*/
  $('select').niceSelect()

  /*==========   portfolio Filtering and Sorting  ==========*/
  $('#filtered-items-wrap').mixItUp()
  $('.portfolio-filter li a').on('click', function (e) {
    e.preventDefault()
  })

  /*==========   Range Slider  ==========*/
  var $rangeSlider = $('#rangeSlider'),
    $rangeSliderResult = $('#rangeSliderResult')
  $rangeSlider.slider({
    range: true,
    min: 0,
    max: 300,
    values: [50, 200],
    slide: function (event, ui) {
      $rangeSliderResult.val('$' + ui.values[0] + ' - $' + ui.values[1])
    }
  })
  $rangeSliderResult.val(
    '$' +
      $rangeSlider.slider('values', 0) +
      ' - $' +
      $rangeSlider.slider('values', 1)
  )
})

/*==========   Reset Form Fields    ==========*/

// let btnClear = document.querySelector('button');
// let input = document.querySelector('input');

// btnClear.addEventListener('click', () => {
//     input.forEach(input.name = '')
// });

// Faq JS
// document.addEventListener('DOMContentLoaded', function () {
//     const accordionItems = document.querySelectorAll('.accordion-item');

//     accordionItems.forEach((item) => {
//       const header = item.querySelector('.accordion-item__header');
//       const body = item.querySelector('.accordion-item__body');

//       header.addEventListener('click', () => {
//         item.classList.toggle('active');

//         if (item.classList.contains('active')) {
//           body.style.maxHeight = body.scrollHeight + 'px';
//         } else {
//           body.style.maxHeight = '0';
//         }
//       });
//     });
//   });

// <!-- Include your scripts, such as the navigation script, here -->

$(document).ready(function () {
  // Get the current page filename (e.g., index.html, about.html)
  var currentPage = window.location.pathname.split('/').pop()

  // Add active class to the navigation link with a matching href
  $('.navbar-nav .nav__item-link').each(function () {
    var linkHref = $(this).attr('href').split('/').pop()
    if (linkHref === currentPage) {
      $(this).addClass('active')
    }
  })
})

//   <!-- Form Script JS  -->

$(document).ready(function () {
  // Validate UK postal code
  function validatePostalCode (postalCode) {
    // UK postal code regex pattern
    var regex = /^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][ABD-HJLNP-UW-Z]{2}$/i
    return regex.test(postalCode)
  }

  // Form submission
  $('#myForm').submit(function (event) {
    var postalCodeInput = $('#PCode')
    var postalCodeValue = postalCodeInput.val()
    var postalCodeMessage = $('#postalCodeMessage')

    // Check if the entered postal code is valid
    if (!validatePostalCode(postalCodeValue)) {
      postalCodeMessage.show() // Display the message
      event.preventDefault() // Prevent form submission
    } else {
      postalCodeMessage.hide() // Hide the message if postal code is valid
    }
    // Continue with form submission
  })
})

// Chat JS
// <!--Start of Tawk.to Script-->
var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date()
;(function () {
  var s1 = document.createElement('script'),
    s0 = document.getElementsByTagName('script')[0]
  s1.async = true
  s1.src = 'https://embed.tawk.to/621f44e61ffac05b1d7c8fa5/1ft52a9pf'
  s1.charset = 'UTF-8'
  s1.setAttribute('crossorigin', '*')
  s0.parentNode.insertBefore(s1, s0)
})()

// <!--End of Tawk.to Script-->
