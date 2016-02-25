// =================================================
//   Helpers
// =================================================
Template.availableUser.helpers({
    getUsername: function(user) {
        return user.username;   // || (user._id === Meteor.userId() ? '' : 'stranger');
    },

    getAvatar: function(user) {
        return user.profile.avatar || 'ava0.png';
    },

    isMyUser: function(userId) {
        return (userId === Meteor.userId());
    },
});
