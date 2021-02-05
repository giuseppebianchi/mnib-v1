(function ($, window, document, undefined) {

    'use-strict';

    var winWidth, socialHeight;

    function setWidth() {

        winWidth = $(window).innerWidth(); //This may need to be width()	
        socialHeight = (winWidth > 640) ? 120 : 160;

    }

    setWidth();

    function addBanner(){
        const firstBox = document.body.querySelector(".content");
        const banner = document.createElement("div");
        banner.className = "banner-alert";
        banner.innerHTML = 'This website is online for presentation-purpose only because not maintained anymore. <br> <a href="https://giuseppebianchi.github.io/mynameisbianchi/" class="button-white">Check the current version here.</a>';
        firstBox.prepend(banner)
    }

    $(window).on('resize', setWidth);
    //Dom Ready
    $(function () {

        addBanner();

        var bLazy = new Blazy({
            selector: '.b-lazy'
        });

        /*var didScroll = false,
            icon = $(".huge-title"),
            $window = $(window);

        $(window).scroll(function () {
            didScroll = true;
        });

        window.setInterval(function () {
            if (didScroll) {
                if (1 - $window.scrollTop() / 200 > -20) {
                    icon.css({
                        opacity: 1 - $window.scrollTop() / 500
                    });
                }
                didScroll = false;
            }
        }, 50);

        //Social Scroll
        $(window).scroll(function () {
            if ($(window).scrollTop() < 300) {
                $('#socialsection').css({
                    opacity: "0"
                }, 500);
            } else if ($(window).scrollTop() > 300) {
                $('#socialsection').css({
                    opacity: "1"
                }, 500);
            }
        });*/

       

       

        

        //plusAnchor
        $(".goToSection").click(function(e){
            e.preventDefault();
            var id = $(this).attr("href");
            $('html,body').animate({
                scrollTop: $(id).offset().top - 50
            }, 500);

        })

        //Video Wallpaper Settings - alter the URL's to your converted videos		
        /*$("#video_element").wallpaper({
            source: {
                mp4: "videos/clouds2.mp4",
                ogg: "videos/clouds2.ogv",
                webm: "videos/clouds2.webm"
            }
        });*/

        //fitVids
        $(".video-container").fitVids();

        

    

        //owlCarousel - these settings are for the tweets and sub heading under your name title at the top
        $(".tweets").owlCarousel({

            // Most important owl features
            items: 1,
            itemsCustom: false,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            singleItem: false,
            itemsScaleUp: false,

            //Basic Speeds - set your speeds in milliseconds here!
            slideSpeed: 400,
            paginationSpeed: 800,
            rewindSpeed: 1000,

            //Autoplay
            autoPlay: true,
            stopOnHover: true

        })

        $(".owl-cover").owlCarousel({

            // Most important owl features
            items: 1,
            itemsCustom: false,
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            singleItem: false,
            itemsScaleUp: false,
            cover: $(".twitter-cover"),

            //Basic Speeds - set your speeds in milliseconds here!
            slideSpeed: 600,

            //Autoplay
            autoPlay: false,
            stopOnHover: true,
            addClassActive: true,
            beforeMove: function(){
                if($(".twitter-cover .active .twitter-front").length){
                    $(".twitter-cover").addClass("dark")
                }else{
                    $(".twitter-cover").removeClass("dark")
                }
            }
        })
        //owlCarousel - these settings are for the client logos
        $(".owl-example").owlCarousel({

            // Most important owl features
            items: 1,
            itemsCustom: false,
            itemsDesktop: [1199, 2],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 2],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            singleItem: false,
            itemsScaleUp: false,

            //Basic Speeds - set your speeds in milliseconds here!
            slideSpeed: 400,
            paginationSpeed: 800,
            rewindSpeed: 1000,

            //Autoplay
            autoPlay: true,
            stopOnHover: true,

            // Navigation
            navigation: false,
            navigationText: ["prev", "next"],
            rewindNav: true,
            scrollPerPage: false,

            //Pagination
            pagination: true,
            paginationNumbers: false,

            // Responsive 
            responsive: true,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: window,

            // CSS Styles
            baseClass: "owl-carousel",
            theme: "owl-theme",

            //Lazy load
            lazyLoad: false,
            lazyFollow: true,
            lazyEffect: "fade",

            //Auto height
            autoHeight: true,

            //JSON 
            jsonPath: false,
            jsonSuccess: false,

            //Mouse Events
            dragBeforeAnimFinish: true,
            mouseDrag: true,
            touchDrag: true,

            //Transitions
            transitionStyle: false,

            // Other
            addClassActive: false,

            //Callbacks
            beforeUpdate: false,
            afterUpdate: false,
            beforeInit: false,
            afterInit: false,
            beforeMove: false,
            afterMove: false,
            afterAction: false,
            startDragging: false,
            afterLazyLoad: false

        })

        var menu = document.getElementById("menu-button");
        menu.addEventListener("click", function (){
          this.classList.toggle('open');
        });
        var body = $("body");
        var modal = $("#ModalOverlayer");
        var modalImg = $("#ModalImage");
        $(".bmodal").click(function(e){
            e.preventDefault();
            body.addClass("modal-open");
            modalImg.attr("src", $(this).data("img"))
        })
        modal.click(function(){
            body.removeClass("modal-open");
            modalImg.attr("src", "");
        })


        
        //Contact Form
        $(document).on('submit', 'form#contact_form', function (e) {
        
            e.preventDefault();
        
            $('form#contact_form .error').remove();
        
            var hasError = false;
        
            $('.requiredField').each(function () {
        
                if ($.trim($(this).val()) == '') {
        
                    var labelText = $(this).prev('label').text();
        
                    $(this).parent().append('<span class="error">Please complete the required fields.</span>');
        
                    $(this).addClass('inputError');
        
                    hasError = true;
        
                } else if ($(this).hasClass('email')) {
        
                    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        
                    if (!emailReg.test($.trim($(this).val()))) {
        
                        var labelText = $(this).prev('label').text();
         
						$(this).parent().append('<span class="error">You entered an invalid email</span>');
                 
                        $(this).addClass('inputError');
                 
                        hasError = true;
                 
                    }
                
                }
            
            });
            
            if (!hasError) {
                
                var formInput = $(this).serialize();
            
                $.post($(this).attr('action'), formInput, function (data) {
                    if(data == "sent"){
                        $('form#contact_form input.submit').fadeOut('normal', function(){
                           $('form#contact_form').append('<p class="success">Thank you! Your email was successfully sent. I will contact you as soon as possible.</p>'); 
                        });  
                    }else{
                        $('form#contact_form').append('<p class="error">Ops! Something went wrong. Try Later.</p>');  
                    }
                });
            
            }

            return false;

        });

    });

})(window.jQuery, this, document);

