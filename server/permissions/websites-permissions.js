//   See also websites-collection.js for Schema-Collection2 tests
Websites.deny({
    update: function (userId, doc, fields, modifier) {
        if (!Meteor.user()) {
            return true;
        }
        // can't change owners
        return _.contains(fields, 'createdBy');
    },
});


Websites.allow({
	insert: function(userId, doc) {
        if (!Meteor.user()) {
            return false;
        }

        var username = Meteor.user().username;
        if (Websites.find({createdBy: username}).count() > 100) {
            console.log('A user ' + username + 'is trying to insert more then 100 websites');
            return false;
        }

        return (doc  &&  doc.createdBy === username);
	}, 

	update: function(userId, doc, fields, modifier) {
		if (Meteor.user()) {
            return (_.contains(fields, 'votePlus') || _.contains(fields, 'voteMinus'));
		} else {
			return false;
		}
	},
});
