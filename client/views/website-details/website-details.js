/////
//   Template Helpers
/////
Template.website_details.helpers({
    formatDate: function(date) {
        return date.toISOString().slice(0, 10);
    },

    getUserName: function(id) {
        var user = Meteor.users.find({_id: id}).fetch()[0];
        if (user) {
            return user.username;
        }
        return 'n/a';
    },
});


/////
//   Template Events
/////
Template.website_details.events({

    "click .js-upvote": function(event) {
        if (!Meteor.user()) {
            alert("Please log in to up vote websites");
            return false;
        }
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        Websites.update({_id: website_id}, {$inc: {'votePlus': 1}});
        return false; // prevent the button from reloading the page
    },

    "click .js-downvote": function(event) {
        if (!Meteor.user()) {
            alert("Please log in to down vote websites");
            return false;
        }
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        Websites.update({_id: website_id}, {$inc: {'voteMinus': -1}});
        return false; // prevent the button from reloading the page
    }
});

