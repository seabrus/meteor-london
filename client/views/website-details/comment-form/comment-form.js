// =================================================
//   Session's
// =================================================
Session.setDefault('comment_error_required', false);
Session.setDefault('comment_error_too_small', false);


// =================================================
//   Template Helpers
// =================================================
Template.commentForm.helpers({
    comment_error_required: function() {
        return Session.get('comment_error_required');
    },

    comment_error_too_small: function() {
        return Session.get('comment_error_too_small');
    },
});


// =================================================
//   Template Events
// =================================================
Template.commentForm.events({
    "click .js-toggle-comment-form": function(event) {
        $("#comment-form").toggle('slow');
    },

    "submit .js-save-comment-form": function(event) {
        var form = event.target;
        var commentText = form.commentText.value.trim();

        // Comment validation 
        Session.set('comment_error_required', false);
        Session.set('comment_error_too_small', false);
        // Comment is required
        if (!commentText) {
            Session.set('comment_error_required', true);
            form.commentText.focus();
            return false;
        }
        // Comment should be at least COMMENT_MIN_LENGTH symbols in length
        if (commentText.length < COMMENT_MIN_LENGTH) {
            Session.set('comment_error_too_small', true);
            form.commentText.focus();
            return false;
        }

        // Save the comment to DB
        if (Meteor.user()) {
            Comments.insert({
                commentText: commentText,
                createdOn: new Date(),
                createdBy: Meteor.user().username || 'User without name',
                websiteId: this._id,   // website's  _id
            });

            // Hide the form
            $("#comment-form").toggle('slow');
        }

        return false; // stop the form submit from reloading the page
    },


    "click .js-clear-comment-form": function(event) {
        Session.set('comment_error_required', false);
        Session.set('comment_error_too_small', false);

        var form = $('form').get(0);
        form.commentText.value = '';

        return false; // stop the form submit from reloading the page
    },

});
