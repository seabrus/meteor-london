// Set up the main template the the router will use to build pages
Router.configure({
    layoutTemplate: 'applicationLayout'
});


// Specify the top level route, the page users see when they arrive at the site
Router.route('/', function() {
    this.render("navbar", {to: "header"});
    this.render("home", {to: "main"});
});


// Specify a route that allows the current user to chat to another users
Router.route('/chat/:_id', function() {
    // the user they want to chat to has id equal to the id sent in after /chat/...
    var otherUserId = this.params._id;

    // find a chat that has two users that match current user id
    // and the requested user id
    var selector = {$or: [
        {user1Id: Meteor.userId(), user2Id: otherUserId},
        {user2Id: Meteor.userId(), user1Id: otherUserId}
    ]};
    var chat = Chats.findOne(selector);

    // no chat matching the filter - need to insert a new one
    if (!chat) {
      chatId = Chats.insert({user1Id: Meteor.userId(), user2Id: otherUserId});
    }
    else { // there is a chat going already - use that
      chatId = chat._id;
    }

    if (chatId) { // looking good, save the id to the session
      Session.set("chatId", chatId);
    }

    this.render("navbar", {to: "header"});
    this.render("chatPage", {to: "main"});
});
