/////
//   Template Helpers
/////
Template.website_item.helpers({
    formatDate: function(date) {
        return date.toISOString().slice(0, 10);
    },

    isEven: function(index) {
        return (index + 1) % 2;
    },
});


/////
//   Template Events
/////
Template.website_item.events({

    "click .js-upvote": function(event) {
        if (!Meteor.user()) {
            alert("Please log in to up vote websites");
            return false;
        }

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        //console.log("Up voting website with id " + website_id);

        // put the code in here to add a vote to a website!
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
        //console.log("Down voting website with id " + website_id);

        // put the code in here to remove a vote from a website!
        Websites.update({_id: website_id}, {$inc: {'voteMinus': -1}});

        return false; // prevent the button from reloading the page
    }
});

