MusicMachine.allow({
	insert: function() {
        return false;
	}, 
	remove: function() {
        return false;
	}, 

	update: function(userId, doc, fields, modifier) {
//        return (_.contains(fields, 'slide'));
        return true;
	},
});
