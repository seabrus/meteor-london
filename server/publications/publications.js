//   Any client-provided information passed to a publish function should be run through the check package.
//   Always check the user - he/she should be logged in!
//   Inside a Meteor.publish function, use the server-provided this.userId, not a client-provided property to determine access. 

//   Using the "browser-policy" package helps prevent malicious JavaScript from being injected client-side, your site being iframed by a malicious site, etc.

Meteor.publish('websites', function() {
    return Websites.find({});
});


NonEmptyString = Match.Where(function(x) {
    check(x, String);
    return x.length > 0;
});

Meteor.publish('website', function(websiteId) {
    if (Match.test(websiteId, NonEmptyString)) {
        return Websites.find({_id: websiteId});
    }
    
	this.ready();
	return;
});

Meteor.publish('comments', function(websiteId) {
    if (Match.test(websiteId, NonEmptyString)) {
        return Comments.find({websiteId: websiteId});
    }
    
	this.ready();
	return;
});


