/*
Template Name: Admin Template
Author: Wrappixel

File: js
*/
// ============================================================== 
// Auto select left navbar
// ============================================================== 
window.$(function() {
    "use strict";
     var url = window.location + "";
        var path = url.replace(window.location.protocol + "//" + window.location.host + "/", "");
        var element = window.$('ul#sidebarnav a').filter(function() {
            return this.href === url || this.href === path;// || url.href.indexOf(this.href) === 0;
        });
        element.parentsUntil(".sidebar-nav").each(function (index)
        {
            if(window.$(this).is("li") && window.$(this).children("a").length !== 0)
            {
                window.$(this).children("a").addClass("active");
                window.$(this).parent("ul#sidebarnav").length === 0
                    ? window.$(this).addClass("active")
                    : window.$(this).addClass("selected");
            }
            else if(!window.$(this).is("ul") && window.$(this).children("a").length === 0)
            {
                window.$(this).addClass("selected");
                
            }
            else if(window.$(this).is("ul")){
                window.$(this).addClass('in');
            }
            
        });

    element.addClass("active"); 
    window.$('#sidebarnav a').on('click', function (e) {
        
            if (!window.$(this).hasClass("active")) {
                // hide any open menus and remove all other classes
                window.$("ul", window.$(this).parents("ul:first")).removeClass("in");
                window.$("a", window.$(this).parents("ul:first")).removeClass("active");
                
                // open our new menu and add the open class
                window.$(this).next("ul").addClass("in");
                window.$(this).addClass("active");
                
            }
            else if (window.$(this).hasClass("active")) {
                window.$(this).removeClass("active");
                window.$(this).parents("ul:first").removeClass("active");
                window.$(this).next("ul").removeClass("in");
            }
    })
    window.$('#sidebarnav >li >a.has-arrow').on('click', function (e) {
        e.preventDefault();
    });
    
});