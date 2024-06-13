$(document).ready(function () {
    /* ------------increase/decrease font size ---------------------*/
    // var $affectedElements = $("p, h1, h2, h3, h4, h5, h6, li, a"); // Can be extended, ex. $("div, p, span.someClass")

    // Storing the original size in a data attribute so size can be reset
    // $affectedElements.each(function () {
    //     var $this = $(this);
    //     $this.data("orig-size", $this.css("font-size"));
    // });

    // $(document).on("click", "#btn-increase", function () {
    //     changeFontSize(1);
    // });

    // $(document).on("click", "#btn-decrease", function () {
    //     changeFontSize(-1);
    // });

    // $(document).on("click", "#btn-orig", function () {
    //     $affectedElements.each(function () {
    //         var $this = $(this);
    //         $this.css("font-size", $this.data("orig-size"));
    //     });
    // });

    function changeFontSize(direction) {
        $affectedElements.each(function () {
            var $this = $(this);
            $this.css(
                "font-size",
                parseInt($this.css("font-size")) + direction
            );
        });
    }

    // theme change js code start
    // theme change js start
    // https://github.com/CodyHouse/dark-light-mode-switch
    // (function () {
    //     // Theme switch
    //     var themeSwitch =
    //         document.getElementById("themeSwitchToggle1");
    //     if (themeSwitch) {
    //         // initTheme(); // if user has already selected a specific theme -> apply it
    //         themeSwitch.addEventListener(
    //             "change",
    //             function (event) {
    //                 resetTheme(); // update color theme
    //             }
    //         );

    //         function initTheme() {
    //             if (
    //                 window.matchMedia &&
    //                 window.matchMedia(
    //                     "(prefers-color-scheme: dark)"
    //                 ).matches
    //             ) {
    //                 document.documentElement.classList.add(
    //                     "theme-dark"
    //                 );
    //                 window.localStorage.setItem(
    //                     "themeSwitch",
    //                     "dark"
    //                 );
    //             }
    //             var darkThemeSelected =
    //                 localStorage.getItem("themeSwitch") !== null &&
    //                 localStorage.getItem("themeSwitch") === "dark";
    //             // update checkbox
    //             themeSwitch.checked = darkThemeSelected;
    //             // update class on html element
    //             darkThemeSelected
    //                 ? document.documentElement.classList.add(
    //                         "theme-dark"
    //                     )
    //                 : document.documentElement.classList.remove(
    //                         "theme-dark"
    //                     );
    //         }

    //         function resetTheme() {
    //             if (themeSwitch.checked) {
    //                 // dark theme has been selected
    //                 document.documentElement.classList.add(
    //                     "theme-dark"
    //                 );
    //                 localStorage.setItem("themeSwitch", "dark");
    //             } else {
    //                 document.documentElement.classList.remove(
    //                     "theme-dark"
    //                 );
    //                 localStorage.removeItem("themeSwitch");
    //             }
    //         }
    //     }
    // })();
    // theme change js code end here
});
// Spinner
var spinner = function () {
    setTimeout(function () {
        if ($("#spinner").length > 0) {
            $("#spinner").removeClass("show");
        }
    }, 1000);
};
spinner();

// Initiate the wowjs
new WOW().init();

// Sticky Navbar
$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $(".sticky-top").css("top", "0px");
    } else {
        $(".sticky-top").css("top", "-100px");
    }
});
// $(document).ready(function () {
//     // Dropdown on mouse hover
//     const $dropdown = $(".dropdown");
//     const $dropdownToggle = $(".dropdown-toggle");
//     const $dropdownMenu = $(".dropdown-menu");
//     const showClass = "show";

//     $(window).on("load resize", function () {
//         if (this.matchMedia("(min-width: 992px)").matches) {
//             $dropdown.hover(
//                 function () {
//                     const $this = $(this);
//                     $this.addClass(showClass);
//                     $this
//                         .find($dropdownToggle)
//                         .attr("aria-expanded", "true");
//                     $this.find($dropdownMenu).addClass(showClass);
//                 },
//                 function () {
//                     const $this = $(this);
//                     $this.removeClass(showClass);
//                     $this
//                         .find($dropdownToggle)
//                         .attr("aria-expanded", "false");
//                     $this.find($dropdownMenu).removeClass(showClass);
//                 }
//             );
//         } else {
//             $dropdown.off("mouseenter mouseleave");
//         }
//     });
// });

$(document).ready(function () {
    $(document).on("click", ".fa-search-toggle", function () {
        $(".search-box").toggle();
        $("input[type='text']").focus();
    });
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 120) {
        $("#js-navbar").addClass("fixed");
    } else {
        $("#js-navbar").removeClass("fixed");
    }
});

// Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $(".back-to-top").fadeIn("slow");
    } else {
        $(".back-to-top").fadeOut("slow");
    }
});
$(".back-to-top").click(function () {
    $("html, body").animate(
        { scrollTop: 0 },
        1500,
        "easeInOutExpo"
    );
    return false;
});

(function ($) {
    "use strict";

    var fullHeight = function () {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
            $('.js-fullheight').css('height', $(window).height());
        });

    };
    fullHeight();

    $(document).on('click', '#sidebarCollapse', function () {
        $('#sidebar').toggleClass('active');
    });

})(jQuery);


