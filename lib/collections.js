Websites = new Mongo.Collection('websites');


Websites.deny({
    update: function (userId, doc, fields, modifier) {
        // can't change owners
        return _.contains(fields, 'createdBy');
    },
});

Websites.allow({
	insert: function(userId, doc) {
        return (Meteor.user()  &&  doc  &&  doc.createdBy === userId);
	}, 

	update: function(userId, doc, fields, modifier) {
		if (Meteor.user()) {
            return (_.contains(fields, 'votePlus') || _.contains(fields, 'voteMinus'));
		} else {
			return false;
		}
	},

});


