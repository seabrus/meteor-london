/////
// template helpers
/////

// helper function that returns all available websites
Template.website_list.helpers({
    websites: function() {
        return Websites.find({}, {sort: [['votePlus', 'desc'], ['voteMinus', 'desc']]}).fetch();
    },

    appendIndex: function(obj, index) {
        return _.extend(obj, {index: index});
    },

});
