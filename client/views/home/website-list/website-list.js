/// Infinite scroll

var lastScrollTop = 0; 

$(window).scroll(function(event) {
    // test if we are near the bottom of the window
    if ($(window).scrollTop() + $(window).height()  >  $(document).height() - 100) {
        // where are we in the page? 
        var scrollTop = $(this).scrollTop();
        // test if we are going down
        if (scrollTop > lastScrollTop) {
            // yes we are heading down...
           Session.set('websitesPerPageLimit', Session.get('websitesPerPageLimit') + 5);
        }

        lastScrollTop = scrollTop;
    };
});


/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
    appendIndex: function(obj, index) {
        return _.extend(obj, {index: index});
    },
});
