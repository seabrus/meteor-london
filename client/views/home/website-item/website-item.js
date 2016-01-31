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
