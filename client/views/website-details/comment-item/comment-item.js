/////
//   Template Helpers
/////
Template.comment_item.helpers({
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

    isEven: function(index) {
        return (index + 1) % 2;
    },
});


/////
//   Template Events
/////
Template.comment_item.events({

});

