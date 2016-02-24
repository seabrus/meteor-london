// =================================================
//   Template's variables, functions, and subscription
// =================================================
Template.chatPage.onCreated(function() {
    var templateInstance = this;

    templateInstance.chat = function() { 
        return Chats.findOne({_id: Session.get('chatId')});
    };

    templateInstance.autorun(function() {
        templateInstance.subscribe('messages', Session.get('chatId'));

        var chat = templateInstance.chat();
        if (chat) {
            var companionId = (chat.user1Id === Meteor.userId()) ? chat.user2Id : chat.user1Id;
            templateInstance.companion = Meteor.users.findOne({_id: companionId});
        }
    });

});


// =================================================
//   Helpers
// =================================================
Template.chatPage.helpers({

    companion: function() {
        var companion = Template.instance().companion;
        if (companion) {
            var profile = companion.profile;
            //if (!profile.username) {
            //    profile.username = companion.username;   //'stranger';
            //}
            if (!profile.avatar) {
                profile.avatar = 'ava0.png';
            }
            return companion;
        }

        return {profile: {}};
    },

    messages: function() {
        if (Template.instance().subscriptionsReady()) {
            return Messages.find({chatId: Session.get('chatId')}, {sort: [['createdAt', 'asc']]});
        }

        return [];
    },

    emos: function() {
        return [                                        // credits to WebIconSet.com
            {image: 'smile.png', sign: ':)', title: 'Smile :)'},
            {image: 'sad.png', sign: ':(', title: 'Sad :('},
            {image: 'heart.png', sign: '(heart)', title: 'Heart (heart)'},
            {image: 'sun.png', sign: '(sun)', title: 'Sun (sun)'},
            {image: 'kiss.png', sign: '(kiss)', title: 'Kiss (kiss)'},
            {image: 'drinks.png', sign: '(d)', title: 'Drinks (drinks)'},
            {image: 'cake.png', sign: '(^)', title: 'Cake (^)'},
            {image: 'nerd.png', sign: '(nerd)', title: 'Nerd (nerd)'},
            {image: 'star.png', sign: '(*)', title: 'Star (*)'},
            {image: 'flower.png', sign: '(F)', title: 'Flower (F)'},
        ];
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

        var chat = instance.chat();
        if (chat) {
            var text = event.target['chat-textarea'].value;
            // reset the form
            event.target['chat-textarea'].value = '';

            // insert the message in the database
            Meteor.call('addMessage', chat._id, text, function(error) {
                if (error) {
                    console.log('addMessage error');
                }
            });

        }
    }, // end of " 'submit .js-send-chat'..."


    // this event fires when the user clicks the button "Remove..."
    'click .js-remove-messages': function(event, instance) {
        // stop the form from triggering a page reload
        event.preventDefault();

        var chat = instance.chat();
        if (chat) {
            var yes = confirm('Are you sure?');
            if (yes) {
                // remove the messages
                Meteor.call('removeMessages', chat._id, function(error) {
                    if (error) {
                        console.log('removeMessages error');
                    }
                });
            } // end of "if (yes)..."
        }
    }, // end of " 'click .js-remove-messages'..."


    // this event fires when the user clicks on an emoticon
    'click .js-emo': function(event) {
        event.preventDefault();

        var emoString = $(event.target).data('emo');
        var textarea = $('#textarea_id');
        var caretPos = textarea.caret();   // see for details /client/lib/caret/caret.js and https://github.com/accursoft/caret
        var initText = textarea.val();
        var resultText = initText.slice(0, caretPos) + emoString + initText.slice(caretPos);

        textarea.val(resultText);
        textarea.focus();
        textarea.caret(caretPos + emoString.length);
    }, // end of " 'click .js-emo'..."

});
