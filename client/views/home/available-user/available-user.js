// =================================================
//   Helpers
// =================================================
Template.availableUser.helpers({
    getUsername: function(userId) {
        user = Meteor.users.findOne({_id: userId});
        return user.profile.username;
    },

    isMyUser: function(userId) {
        return (userId === Meteor.userId());
    },
});

