//   Any client-provided information passed to a publish function should be run through the check package.
//   Always check the user - he/she should be logged in!
//   Inside a Meteor.publish function, use the server-provided this.userId, not a client-provided property to determine access. 

//   Using the "browser-policy" package helps prevent malicious JavaScript from being injected client-side, your site being iframed by a malicious site, etc.


// ===================================================
//   Publications for 'home' '/' route
// ===================================================
Meteor.publish('websites', function(searchString) {

    if (Match.test(searchString, String)) {
        var str = searchString.toLowerCase();

        if (str === '') {
            return Websites.find({}, {limit: 100});
        }
        else {
            return Websites.find(
                    {
                        $text: {$search: str}
                        // see explaination at https://www.okgrow.com/posts/guide-to-full-text-search-in-meteor
                    },
                    {limit: 100}
            );

/*
            return Websites.find(
                    {
                        $where: 'function() {var title=this.title.toLowerCase();var descr=this.description.toLowerCase();return (title.indexOf("' + str + '") !== -1 || descr.indexOf("' + str + '") !== -1); }'
                        // see explaination at http://www.btday.com/where-mongo-operator-work-around-in-meteorjs/
                    },
                    {limit: 100}
            );
*/
        } // end of "if (str === '')...else..."

    } // end of "if (Match.test(searchString, String))..."
    
	this.ready();
	return;
});


// ===================================================
//   Check pattern
// ===================================================
NonEmptyString = Match.Where(function(x) {
    check(x, String);
    return x.length > 0;
});

// ===================================================================
//   Publications for website_details '/website-details/:id' route
// ===================================================================
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

