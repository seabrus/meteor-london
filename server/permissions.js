MusicMachine.allow({
	insert: function() {
        return false;
	}, 
	remove: function() {
        return false;
	}, 

	update: function(userId, doc, fields, modifier) {
//        return true;
        return (_.contains(fields, 'isPlaying') || _.contains(fields, 'speed') || _.contains(fields, 'volume'));
	},
});
