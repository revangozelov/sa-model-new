var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
       
  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

     
      if (sParameterName[0] === sParam) {
          return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
  }
  return false;
};
var UrlQb = "https://app.sourcedagile.com/";
(function () {

    var alte = getUrlParameter("point");



      if (alte === 'certificate') {

        var dt = getUrlParameter('certificateId');
       

        if(dt === false){
           
          genCertificationBlock14();
        }else{

          var subdt = getUrlParameter('sub_cert');


          if(subdt===false){
            getGroupInside(dt);
          }else{
            getSingleSerc(subdt);
          }
      
          

        }

      }

      
     



  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      try {
        return document.querySelector(el)
      } catch (err) {

      }

    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);



    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

})();


function genCertificationBlock14() {

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getCertificationGroupList4Web",
    data: JSON.stringify(), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r


      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id
        var imgSld = dat[index].logo
        var orn = dat[index].orderNo


        var myArray = ['blue', 'red', 'orange', "green", 'purple', 'pink'];
        var rand = myArray[Math.floor(Math.random() * myArray.length)];

        $('#certificatie-block')
          .append($("<div>").attr('id', idSld)
            .addClass('col-lg-4 col-md-6').attr('data-aos', 'fade-up').attr('data-aos-delay', (index + 100) * index).css('order', orn)
            .append($("<div>")
              .addClass('service-box ' + rand)
              .append('<img src="' + UrlQb + 'api/get/zdfiles/traininghub/' + imgSld + '" alt="">')
              .append(' <a href="#" id="red_certification" class="read-more"><span>Read More</span> <i class="bi bi-arrow-right"></i></a>')
            ))



      }


    },

    error: function (jqXHR, status) {

    }
  });
}

$(document).on("click", "#red_certification", function () {

  var id = $(this).parent().parent().attr('id');
  

  getGroupInside(id);
  insertParam("certificateId", id)

})
$(document).on("click", "#sub_certification", function () {

  var id = $(this).parent().parent().attr('id');
  

  getSingleSerc(id);
  insertParam("sub_cert", id)

})

function getGroupInside(id) {

  var ts = {
    "kv": {
      "fkCertificationGroupId": id

    }
  }

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getCertificationList",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {

      var dat = data.tbl[0].r


      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id
        var imgSld = dat[index].logo
      


        var myArray = ['blue', 'red', 'orange', "green", 'purple', 'pink'];
        var rand = myArray[Math.floor(Math.random() * myArray.length)];

        $('#certificatie-block')
          .append($("<div>").attr('id', idSld)
            .addClass('col-lg-4 col-md-6').attr('data-aos', 'fade-up').attr('data-aos-delay', (index + 100) * index)
            .append($("<div>")
              .addClass('service-box ' + rand)
              .append('<img src="' + UrlQb + 'api/get/zdfiles/traininghub/' + imgSld + '" alt="">')
              .append(' <a href="#" id="sub_certification" class="read-more"><span>Read More</span> <i class="bi bi-arrow-right"></i></a>')
            ))



      }


    }
  })


}
function getSingleSerc(id) {

  var ts = {
    "kv": {
      "id": id

    }
  }

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getCertificationTrainingInfo",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {

      var dat = data.tbl[0].r


      for (let index = 0; index < dat.length; index++) {
        var idSld = dat[index].id
        var desct = dat[index].trainingDescription
      
        
        $('#certificatie-block')
          .append($("<div>").attr('id', idSld)

            .append(desct))



      }


    }
  })


}

function insertParam(key, value) {
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);

  // kvp looks like ['key1=value1', 'key2=value2', ...]
  var kvp = document.location.search.substr(1).split('&');
  let i=0;

  for(; i<kvp.length; i++){
      if (kvp[i].startsWith(key + '=')) {
          let pair = kvp[i].split('=');
          pair[1] = value;
          kvp[i] = pair.join('=');
          break;
      }
  }

  if(i >= kvp.length){
      kvp[kvp.length] = [key,value].join('=');
  }

  // can return this or...
  let params = kvp.join('&');

  // reload page with new params
  document.location.search = params;
}

