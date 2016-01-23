/////
//   Session's
/////
Session.setDefault('comment_error', false);


/////
//   Template Helpers
/////
Template.comment_form.helpers({
    comment_error: function() {
        return Session.get('comment_error');
    },
});


/////
//   Template Events
/////
Template.comment_form.events({
    "click .js-toggle-comment-form": function(event) {
        $("#comment_form").toggle('slow');
    },

    "submit .js-save-comment-form": function(event) {
        var form = event.target;
        var commentText = form.comment_text.value.trim();

        // Comment validation 
        Session.set('comment_error', false);
        if (!commentText) {
            Session.set('comment_error', true);
            return false;
        }

        // Save the comment to DB
        if (Meteor.user()) {
            Comments.insert({
                createdOn: new Date(),
                createdBy: Meteor.user()._id,
                commentText: commentText,
                websiteId: this._id,   // the website _id
            });

            // Close the form
            $("#comment_form").toggle('slow');
        }

        return false; // stop the form submit from reloading the page
    },


    "click .js-clear-comment-form": function(event) {
        Session.set('comment_error', false);

        var form = $('form').get(0);
        form.comment_text.value = '';

        return false; // stop the form submit from reloading the page
    },

});



