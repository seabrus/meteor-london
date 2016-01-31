// =================================================
//   Template Helpers
// =================================================
Template.websiteItem.helpers({
    formatDate: function(date) {
        return date.toISOString().slice(0, 10);
    },

    isEven: function(index) {
        return (index + 1) % 2;
    },
});


// =================================================
//   Template Events
// =================================================
Template.websiteItem.events({

    "click .js-upvote": function(event) {
        if (!Meteor.user()) {
            //alert("Please log in to up vote websites");
            Meteor.__modalAlert('Please log in to up vote websites', 'alert');
            return false;
        }

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var websiteId = this._id;
        Websites.update({_id: websiteId}, {$inc: {'votePlus': 1}});

        return false; // prevent the button from reloading the page
    },


    "click .js-downvote": function(event) {
        if (!Meteor.user()) {
            //alert("Please log in to down vote websites");
            Meteor.__modalAlert('Please log in to down vote websites', 'alert');
            return false;
        }

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var websiteId = this._id;
        Websites.update({_id: websiteId}, {$inc: {'voteMinus': -1}});

        return false; // prevent the button from reloading the page
    },

});
