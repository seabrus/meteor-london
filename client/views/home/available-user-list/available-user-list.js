// =================================================
//   Helpers
// =================================================
Template.availableUserList.helpers({
    users: function() {
        return Meteor.users.find({}, {sort: [['profile.username', 'asc']]});
    }
});
