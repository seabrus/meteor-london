Comments = new Mongo.Collection('comments');
/*
    _id: ID,
    commentText: String,
    createdOn: Date,
    createdBy: String, // user's username
    websiteId: ID,
*/

COMMENT_MIN_LENGTH = 5;

// ================================================
//  Schema
// ================================================
var commentsSchema = new SimpleSchema({
    commentText: {
        type: String,
        label: 'Comment',
        min: COMMENT_MIN_LENGTH,
        autoValue: function() {
            if (!this.isSet) {
                return 'Great website';
            }
        }
    },

    createdOn: {
        type: Date,
        label: 'Created on',
        denyUpdate: true,
        autoValue: function() {
            if (!this.isSet) {
                return new Date();
            }
        },
    },

    createdBy: {
        type: String,
        label: 'Created by',
        denyUpdate: true,
        autoValue: function() {
            if (!this.isSet) {
                return 'admin';
            }
        },
    },

    websiteId: {
        type: String,
        label: 'Website ID',
        autoValue: function() {
            if (!this.isSet) {
                return '__Vs7w2HsJ9';
            }
        },
    },
});

Comments.attachSchema(commentsSchema);
