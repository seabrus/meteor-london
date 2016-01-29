// =================================================
//   Initialization
// =================================================
Template.websiteDetails.onRendered(function() {
    var templateData = this.data;
    var websiteTitle = templateData.website.title;
    var titleTag = templateData.titleTag;

    $('#title-tag').text(titleTag + websiteTitle + ' | Final Assignment');

/*    
// One more solution:
    var routeData = Router.current().data();
    var websiteTitle = routeData.website.title;
    var titleTag = routeData.titleTag;

    $('#title-tag').text(titleTag + websiteTitle + ' | Final Assignment');
    routeData = null;
*/
});


// =================================================
//   Template Helpers
// =================================================
Template.websiteDetails.helpers({
    formatDate: function(date) {
        return date.toISOString().slice(0, 10);
    },
});


// =================================================
//   Template Events
// =================================================
Template.websiteDetails.events({

    "click .js-upvote": function(event) {
        if (!Meteor.user()) {
            alert('Please log in to up vote websites');
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
            alert('Please log in to down vote websites');
            return false;
        }

        var websiteId = this._id;
        Websites.update({_id: websiteId}, {$inc: {'voteMinus': -1}});
        return false;
    }
});
