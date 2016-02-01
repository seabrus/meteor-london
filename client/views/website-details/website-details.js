// =================================================
//   Initialization
// =================================================
Template.websiteDetails.onRendered(function() {
    var templateData = this.data;
    var titleTag = templateData.titleTag;
    //var websiteId = templateData.websiteId;   // >>> see comments in "client/client-routes/routes.js"
    //var websiteTitle = Websites.find({_id:websiteId}).fetch()[0].title;
    var websiteTitle = templateData.website.title;

    $('#title-tag').text(titleTag + websiteTitle + ' | Final Assignment');

/*    // One more solution:
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

    "click .js-upvote, click .js-downvote": function(event) {
        if (!Meteor.user()) {
            //alert("Please log in to vote websites");
            Meteor.__modalAlert('Please log in to vote websites', 'alert');
            return false;
        }

        var websiteId = this._id;

        if ( $(event.currentTarget).hasClass('js-upvote') ) {
            Websites.update({_id: websiteId}, {$inc: {'votePlus': 1}});

            if ( !Session.get('notShowModalAlert') ) {
                Meteor.__modalAlert('Thanks for up voting! Would you like to browse similar websites?', 'confirm', this.title);
            }
        }
        else {
            Websites.update({_id: websiteId}, {$inc: {'voteMinus': -1}});
        }

        return false; // prevent the button from reloading the page
    },

});
