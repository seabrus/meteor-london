// =================================================
//   Template's variables and functions
// =================================================
Template.chatPage.onCreated(function() {
    var template = this;

    template.chat = function() { 
        return Chats.findOne({_id: Session.get('chatId')});
    };

    template.autorun(function() {
        var chat = template.chat();
        if (chat) {
            var companionId = (chat.user1Id === Meteor.userId()) ? chat.user2Id : chat.user1Id;
            template.companion = Meteor.users.findOne({_id: companionId});
        }
    });

});


// =================================================
//   Helpers
// =================================================
Template.chatPage.helpers({
    companionProfile: function() {
        var companion = Template.instance().companion;
        if (companion) {
            var profile = companion.profile;
        }
        return profile;
    },

    messages: function() {
        var chat = Template.instance().chat();
        return chat.messages;
    },

    other_user: function() {
        return '';
    },

});


// =================================================
//   Events
// =================================================
Template.chatPage.events({
    // this event fires when the user sends a message on the chat page
    'submit .js-send-chat': function(event, instance) {
        // stop the form from triggering a page reload
        event.preventDefault();

        // see if we can find a chat object in the database
        // to which we'll add the message
        var chat = instance.chat();

        if (chat) { // ok - we have a chat to use
            var msgs = chat.messages; // pull the messages property
            if (!msgs) { // no messages yet, create a new array
                msgs = [];
            }

            // is a good idea to insert data straight from the form
            // (i.e. the user) into the database? certainly not.
            // push adds the message to the end of the array
            msgs.push({text: event.target['chat-textarea'].value});

            // reset the form
            event.target['chat-textarea'].value = '';

            // put the messages array onto the chat object
            chat.messages = msgs;

            // update the chat object in the database.
            Chats.update(chat._id, chat);
        }
    },
});
