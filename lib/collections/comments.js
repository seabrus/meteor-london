Comments = new Mongo.Collection('comments');
/*
    _id: ID,
    createdBy: ID,
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
        if ( Comments.find({_id: userId}).count() > 100 ) {
            console.log('A user ' + userId + 'is trying to insert more then 100 comments');
            return false;
        }

        return (doc  &&  doc.createdBy === userId);
	}, 

	update: function(userId, doc, fields, modifier) {
		if (Meteor.user()) {
            return (_.contains(fields, 'commentText'));
		} else {
			return false;
		}
	},
});
