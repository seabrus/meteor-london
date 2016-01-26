Websites = new Mongo.Collection('websites');
/*
    _id: ID,
    url: String,
    title: String,
    description: String,
    createdOn: Date,
    createdBy: String, // user's username
    votePlus: Integer,
    voteMinus: Integer,
*/
// ================================================
//  Schema
// ================================================
var websitesSchema = new SimpleSchema({
    url: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        label: '* Site address',
        autoValue: function() {
            if (this.isUpdate) {
                return;
            }
            if (!this.isSet) {
                return 'http://www.coursera.org';
            }
        },
    },

    title: {
        type: String,
        label: '* Title',
        autoValue: function() {
            if (this.isUpdate) {
                return;
            }
            if (!this.isSet) {
                return 'Coursera';
            }
        },
    },

    description: {
        type: String,
        label: 'Description',
        optional: true,
        autoValue: function() {
            if (this.isUpdate) {
                return;
            }
            if (!this.isSet) {
                return '';
            }
        },
    },

    createdOn: {
        type: Date,
        label: 'Created on',
        denyUpdate: true,
        autoValue: function() {
            if (this.isUpdate) {
                return;
            }
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
            if (this.isUpdate) {
                return;
            }
            if (!this.isSet) {
                return 'admin';
            }
        },
    },

    votePlus: {
        type: Number,
        label: 'Up votes',
        min: 0,
        autoValue: function() {
            if (this.isUpdate) {
                return;
            }
            if (!this.isSet) {
                return 0;
            }
        },
    },

    voteMinus: {
        type: Number,
        label: 'Down votes',
        max: 0,
        autoValue: function() {
            if (this.isUpdate) {
                return;
            }
            if (!this.isSet) {
                return 0;
            }
        },
        //defaultValue: '-',
    },
});

//SimpleSchema.debug = true;
Websites.attachSchema(websitesSchema);

