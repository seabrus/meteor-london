Meteor.startup(function() {
    if (MusicMachine.find().count() === 0) {

        MusicMachine.insert({
            title: 'all',
            keyName: 'all',
            isPlaying: false,
            speed: 50,
            amplitude: 100,
        });

        for (var i=0; i < TRACK_NUMBER; i++) {
            MusicMachine.insert({
                title: TRACK_TITLES[i],
                keyName: TRACK_KEYS[i],
                isPlaying: true,
                speed: 50,
                amplitude: 100,
            });
        }

    } // end of "if (MusicMachine.find().count() === 0)..."
});


Meteor.publish("musicMachine", function() {
    return MusicMachine.find({});
});

