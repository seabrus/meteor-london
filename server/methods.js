// ===============================================================================
//   Match pattern
// ===============================================================================
NonEmptyString = Match.Where(function(x) {
    return (typeof x === 'string'  &&  x.length > 0);
});


Meteor.methods({
    // Insert a new chat object
    addChat: function(otherUserId) {
        if (this.userId  &&  Match.test(otherUserId, NonEmptyString)) {

            try {
                var chatId = Chats.insert({user1Id: this.userId, user2Id: otherUserId});
                return chatId;
            }
            catch(e) {
                console.log('addChat error: Cannot insert chat - ' + e.message + '; otherUserId = ' + otherUserId);
                throw new Meteor.Error('addchat-error', 'addChat error 2');
            } // end of "try-catch" block

        } else {
            console.log( 'addChat error: Unauthed user or the "otherUserId" argument is incorrect' );
            throw new Meteor.Error('bad-arguments', 'addChat error 1');
        } 
    }, // end of "addChat..."

});
