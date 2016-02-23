// =================================================
//   Helpers
// =================================================
Template.chatMessage.helpers({
    isMe: function(myUsername, otherUsername) {
        return (myUsername === otherUsername);
    },

    formatDate: function(date) {
        return date.toISOString().slice(5, 10) + ', ' + date.toISOString().slice(11, 16);
    },

    formatText: function(text) {
        if (typeof text !== 'string') { return ''; }

        var symbols = {
            "&": "&amp;", "/": '&#x2F;',
            "<": "&lt;", ">": "&gt;",
            '"': '&quot;', "'": '&#39;',
            "\n": '<br>',
            ":)": '<img src="/icons/smile.png" class="emo">',
            ":(": '<img src="/icons/sad.png" class="emo">',
            "(heart)": '<img src="/icons/heart.png" class="emo">',
            "(kiss)": '<img src="/icons/kiss.png" class="emo">',
            "(sun)": '<img src="/icons/sun.png" class="emo">',
            "(d)": '<img src="/icons/drinks.png" class="emo">',
        };
        return text.replace(/[&<>"'\/]|[\n]|(\:\))|(\:\()|(\(heart\))|(\(kiss\))|(\(sun\))|(\(d\))/g, function(s) { return symbols[s]; });
    },

});

