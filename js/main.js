
/**
   * Easy selector helper function
   */
    /**
   * Easy on scroll event listener 
   */
     const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
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

$(document).on('click', '.mobile-nav-toggle', function (e) {
  select('#navbar').classList.toggle('navbar-mobile')
  this.classList.toggle('bi-list')
  this.classList.toggle('bi-x')
})



function convertStDate(dt) {

	var arr = dt.slice(0, 4);
	var arr1 = dt.slice(4, 6);
	var arr2 = dt.slice(6, 8);

	var fns = arr + "/" + arr1 + '/' + arr2;

	return fns
}



$(document).on("click","#button-message-sub", function(){


  var nm = $("#contact_mail_name").val();
  var body = $("#contact_mail_body").val();
  var subject = $("#contact_mail_subject").val();
  var email = $("#contact_mail_email").val();
  if(nm.length>3&&body.length>4&&subject.length>4&&email.length>5){
  var ts ={    "kv":{       
    "body":body, 
    "senderEmail":email,     
   "senderFullname": nm, 
    "subject":subject   
 }}

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/cl/traininghub/sendWebMessageToCoreContainer",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {


      alert("Message Sended");
    }
  })


$("#contact_mail_name").val("");
  $("#contact_mail_body").val("");
 $("#contact_mail_subject").val("");
 $("#contact_mail_email").val("");
  }else{
   alert("Please fill in all fields")
  }
})


function convertStTime(dt) {

	var arr = dt.slice(0, 2);
	var arr1 = dt.slice(2, 4);


	var fns = arr + ":" + arr1;

	return fns
}

function getSingleSerc(fkId,id,header,lng,strtm,endtm) {

  var ts = {
    "kv": {
      "id": fkId

    }
  }

  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getCertificationDescription",
    data: JSON.stringify(ts), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {

      var dat = data.tbl[0].r
        var logo = dat[0].logo
   
      $("#event_list_hub").append(genEventListBlock(id,logo,header,lng,strtm,endtm,fkId));

     



    }
  })


}


function genEventListBlock(id,logo,header,lng,strtm,endtm,certId){
  return  ` <div id='${id}' class="swiper-slide">
  <div class="testimonial-item">
  <div class="profile mt-auto">
  <img src="${UrlQb}api/get/zdfiles/traininghub/${logo}" class="testimonial-img" alt="">
  <h3> ${header}</h3>
  <h4>Start Time ${strtm} <br> End Time ${endtm}</h4>
</div>
    <p>
    Language ${lng}
    </p>

    <a class="getstarted scrollto" id='event-apply-btn' href="">Apply</a>
    <br>
    <a class="getstarted scrollto" href="index-main.html?&point=certificate&sub_cert=${certId}&section-tab=train">Training</a>
    <br>
    <a class="getstarted scrollto" href="index-main.html?&point=certificate&sub_cert=${certId}&section-tab=cert">Certification</a>
        
  </div>
</div>`
}

var lang  =[
  {key:"en",
    value: "English"
   },
  {key:"az",
    value: "Azeribaijan"
   },
  {key:"ru",
    value: "Russian"
   },
  
]
$(document).ajaxComplete(function(){
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
});
function genEventsList(){
  $.ajax({
    type: "POST",
    url: UrlQb + "api/post/zd/traininghub/getEventList4Web",
    data: JSON.stringify(), // now data come in this function
    contentType: "application/json; charset=utf-8",
    crossDomain: true,
    dataType: "json",
    success: function (data, status, jqXHR) {
      var dat = data.tbl[0].r
      
      for (let index = 0; index < dat.length; index++) {
        var id = dat[index].id
        var fkId = dat[index].fkCertificationId
        var header = dat[index].eventTitle
        var lng = dat[index].eventLang
        var stst = dat[index].eventStatus
        var strtm = ": "+convertStDate(dat[index].startDate)/* +""+ convertStTime(dat[index].startTime) */
        var endtm = ": "+convertStDate(dat[index].endDate)/* +""+ convertStTime(dat[index].endTime) */
 
        var dl = lang.find(x => x.key === lng).value;
        

        if(stst === "A"){
     
          getSingleSerc(fkId,id,header,dl,strtm,endtm);
        }

        


      }

     

    },

    error: function (jqXHR, status) {

    }
  });
}

genEventsList();
 

$(document).ready(function($) {

	'use strict';
/* 
     var top_header = $('.parallax-content');
    top_header.css({'background-position':'center center'}); // better use CSS

    $(window).scroll(function () {
    var st = $(this).scrollTop();
    top_header.css({'background-position':'center calc(50% + '+(st*.5)+'px)'});
    });
 

    $('body').scrollspy({ 
        target: '.fixed-side-navbar',
        offset: 200
    }); */
      
      // smoothscroll on sidenav click
/* 
    $('.tabgroup > div').hide();
        $('.tabgroup > div:first-of-type').show();
        $('.tabs a').click(function(e){
          e.preventDefault();
            var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
      
    })
 */
   


});
// extension:
$.fn.scrollEnd = function(callback, timeout) {          
  $(this).on('scroll', function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};


$(document).ready(function () {
  $(document).on("click",'.fv-tooltiptext', function(){


    $(this).parent().find("a").click();
  })
  $(document).ready(function () {
    var fv = $("#fullview").fullView({
      //Navigation
      dots: true,
      dotsPosition: "right",
      dotsTooltips: true,
  
      //Scrolling
      easing: "swing",
      backToTop: true,
  
      // Accessibility
      keyboardScrolling: true,
  
      // Callback
      onScrollEnd: function (currentView, preView) {
        console.log("Current", currentView);
        console.log("Previus", preView);
      }
    });
  
    $("#down").click(function () {
      // To Scroll Down 1 Section
      fv.data("fullView").scrollDown();
  
      // To Scroll Up 1 Section
      // fv.data('fullView').scrollDown();
    });
  
    $("#select").change(function () {
      // To Scroll to Specfic Section
      fv.data("fullView").scrollTo($(this).val());
    });
  });
});

