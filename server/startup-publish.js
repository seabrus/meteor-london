Meteor.startup(function() {
    if (MusicMachine.find().count() === 0) {

        MusicMachine.insert({
            title: 'all',
            keyName: 'all',
            isPlaying: false,
            speed: 50,
            volume: 0,
        });

        for (var i=0; i < SOUND_NUMBER; i++) {
            MusicMachine.insert({
                title: SOUND_NAMES[i],
                keyName: SOUND_KEYS[i],
                isPlaying: false,
                speed: 50,
                volume: 0,
            });
        }

    } // end of "if (MusicMachine.find().count() === 0)..."
});


Meteor.publish("musicMachine", function() {
    return MusicMachine.find({});
});

