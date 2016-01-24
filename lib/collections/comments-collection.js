Comments = new Mongo.Collection('comments');
/*
    _id: ID,
    createdBy: String, // user's username
    createdOn: Date,
    commentText: String,
    websiteId: ID,
*/

Comments.deny({
    update: function (userId, doc, fields, modifier) {
        // can't change owners
        return _.contains(fields, 'createdBy');
    },
});

Comments.allow({
	insert: function(userId, doc) {
        if (!Meteor.user()) {
            return false;
        }

        var username = Meteor.user().username;
        if (Comments.find({createdBy: username}).count() > 100) {
            console.log('A user ' + username + 'is trying to insert more then 100 comments');
            return false;
        }

        return (doc  &&  doc.createdBy === username);
	}, 

	update: function(userId, doc, fields, modifier) {
		if (Meteor.user()) {
            return (_.contains(fields, 'commentText'));
		} else {
			return false;
		}
	},
});
