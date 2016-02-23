Meteor.publish( 'companions', function() {
    if (this.userId) {
	    return Meteor.users.find(
	            {},
	            {fields: {
                    profile: 1,
                }}
	    );
    }
    
	this.ready();
	return;
});

Meteor.publish( 'chats', function() {
    if (this.userId) {
	    return Chats.find(
	            {},
	            {fields: {
                    user1Id: 1, 
                    user2Id: 1,
                }}
	    );
    }
    
	this.ready();
	return;
});
