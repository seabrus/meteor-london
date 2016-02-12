// MusicMachine = new Mongo.Collection("musicMachine");
/*
    _id: ID,
    title: String,
    keyName: String,
    isPlaying: Boolean,
    speed: Number,
    volume: Number,
*/

// ================================================
//  Schema
// ================================================
var musicMachineSchema = new SimpleSchema({
    title: {
        type: String,
        label: 'Track name',
        denyUpdate: true,
    },

    keyName: {
        type: String,
        label: 'Track key name',
        denyUpdate: true,
    },

    isPlaying: {
        type: Boolean,
        label: 'isPlaying',
        autoValue: function() {
            if (this.isUpdate) {
                return;
            }
            if (!this.isSet) {
                return false;
            }
        },
    },

    speed: {
        type: Number,
        label: 'Speed',
        min: 1,
        max: 100,
        autoValue: function() {
            if (this.isUpdate) {
                return;
            }
            if (!this.isSet) {
                return 50;
            }
        },
    },

    volume: {
        type: Number,
        label: 'Volume',
        min: 1,
        max: 100,
        autoValue: function() {
            if (this.isUpdate) {
                return;
            }
            if (!this.isSet) {
                return 50;
            }
        },
    },
});

MusicMachine.attachSchema(musicMachineSchema);