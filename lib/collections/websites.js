Websites = new Mongo.Collection('websites');

Websites.deny({
    update: function (userId, doc, fields, modifier) {
        // can't change owners
        return _.contains(fields, 'createdBy');
    },
});

Websites.allow({
	insert: function(userId, doc) {
        if (!Meteor.user()) {
            return false;
        }
        if ( Websites.find({_id: userId}).count() > 100 ) {
            console.log('A user' + userId + ' is trying to insert more then 100 websites');
            return false;
        }

        return (doc  &&  doc.createdBy === userId);
	}, 

	update: function(userId, doc, fields, modifier) {
		if (Meteor.user()) {
            return (_.contains(fields, 'votePlus') || _.contains(fields, 'voteMinus'));
		} else {
			return false;
		}
	},
});
