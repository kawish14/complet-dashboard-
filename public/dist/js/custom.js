window.$(function() {
    "use strict";

    window.$(".preloader").fadeOut();
    // ============================================================== 
    // Theme options
    // ==============================================================     
    // ============================================================== 
    // sidebar-hover
    // ==============================================================

    window.$(".left-sidebar").hover(
        function() {
            window.$(".navbar-header").addClass("expand-logo");
        },
        function() {
            window.$(".navbar-header").removeClass("expand-logo");
        }
    );
    // this is for close icon when navigation open in mobile view
    window.$(".nav-toggler").on('click', function() {
        window.$("#main-wrapper").toggleClass("show-sidebar");
        window.$(".nav-toggler i").toggleClass("ti-menu");
    });
    window.$(".nav-lock").on('click', function() {
        window.$("body").toggleClass("lock-nav");
        window.$(".nav-lock i").toggleClass("mdi-toggle-switch-off");
        window.$("body, .page-wrapper").trigger("resize");
    });
    window.$(".search-box a, .search-box .app-search .srh-btn").on('click', function() {
        window.$(".app-search").toggle(200);
        window.$(".app-search input").focus();
    });

    // ============================================================== 
    // Right sidebar options
    // ==============================================================
    window.$(function() {
        window.$(".service-panel-toggle").on('click', function() {
            window.$(".customizer").toggleClass('show-service-panel');

        });
        window.$('.page-wrapper').on('click', function() {
            window.$(".customizer").removeClass('show-service-panel');
        });
    });
    // ============================================================== 
    // This is for the floating labels
    // ============================================================== 
    window.$('.floating-labels .form-control').on('focus blur', function(e) {
        window.$(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    // ============================================================== 
    //tooltip
    // ============================================================== 
    window.$(function() {
        window.$('[data-toggle="tooltip"]').tooltip()
    })
    // ============================================================== 
    //Popover
    // ============================================================== 
    window.$(function() {
        window.$('[data-toggle="popover"]').popover()
    })

    // ============================================================== 
    // Perfact scrollbar
    // ============================================================== 
    window.$('.message-center, .customizer-body, .scrollable').perfectScrollbar({
        wheelPropagation: !0
    });

    /*var ps = new PerfectScrollbar('.message-body');
    var ps = new PerfectScrollbar('.notifications');
    var ps = new PerfectScrollbar('.scroll-sidebar');
    var ps = new PerfectScrollbar('.customizer-body');*/

    // ============================================================== 
    // Resize all elements
    // ============================================================== 
    window.$("body, .page-wrapper").trigger("resize");
    window.$(".page-wrapper").delay(20).show();
    // ============================================================== 
    // To do list
    // ============================================================== 
    window.$(".list-task li label").click(function() {
        window.$(this).toggleClass("task-done");
    });

    //****************************
    /* This is for the mini-sidebar if width is less then 1170*/
    //**************************** 
    var setsidebartype = function() {
        var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
        if (width < 1170) {
            window.$("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
        } else {
            window.$("#main-wrapper").attr("data-sidebartype", "full");
        }
    };
    window.$(window).ready(setsidebartype);
    window.$(window).on("resize", setsidebartype);
    //****************************
    /* This is for sidebartoggler*/
    //****************************
    window.$('.sidebartoggler').on("click", function() {
        window.$("#main-wrapper").toggleClass("mini-sidebar");
        if (window.$("#main-wrapper").hasClass("mini-sidebar")) {
            window.$(".sidebartoggler").prop("checked", !0);
            window.$("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
        } else {
            window.$(".sidebartoggler").prop("checked", !1);
            window.$("#main-wrapper").attr("data-sidebartype", "full");
        }
    });
});