// ===========================================================
//   Initialization
// ===========================================================
Template.trackItem.onRendered(function() {
    var templateInstance = this;
    var track = Template.currentData().track;

    // Speed Slider initialization
    var speedSliderHandler = _.throttle( 
        function(event, ui) {
            MusicMachine.update({_id: track._id}, {$set: {speed: ui.value}});
        }, 
        50, 
        {leading: false}
    );
    var speedSliderDiv = templateInstance.$('#' + track.keyName);
    if ( !speedSliderDiv.data('uiSlider') ) {
        speedSliderDiv.slider({
            slide: speedSliderHandler,
            min: 0,
            max: 100,
        });
        speedSliderDiv.data('uiSlider').value(track.speed);
    }

    // Trace Changes 
    templateInstance.autorun(function() {
        var dbTrack = MusicMachine.findOne({_id: track._id});

        if (dbTrack.isPlaying) { 
            playTrackWithTitle(dbTrack.title); 
        } else { 
            stopTrackWithTitle(dbTrack.title); 
        }
    });

});


// ===========================================================
//   Helpers
// ===========================================================
Template.trackItem.helpers({

    speedSliderVal: function() { 
        // In helpers templateInstance.$(...) do NOT work? 
        //   see https://github.com/meteor/meteor/issues/4264

        var localTrack = Template.currentData().track;
        var trackId = localTrack._id;
        var dbTrack = MusicMachine.findOne({_id: trackId});

        var data = $('#' + dbTrack.keyName).data('uiSlider');
        if (dbTrack && data) { 
            data.value(dbTrack.speed);
        }

        setTrackSpeed(dbTrack.title, dbTrack.speed/50);
        return dbTrack.speed;
    },

    ampSliderVal: function() { 
        return 50;
    },

});


// ===========================================================
//   Events
// ===========================================================
Template.trackItem.events({

    "click button.js-track": function(event) {
        var track = Template.currentData().track;

        if (track.isPlaying) {
            MusicMachine.update({_id: track._id}, {$set: {isPlaying: false}});
        }
        else {
            MusicMachine.update({_id: track._id}, {$set: {isPlaying: true}});
        }
    },

});


        //var button = $(event.target);
        //var trackId = button.data('trackid');
        //var track = MusicMachine.findOne({_id: trackId});

            //Session.set(track.keyName, 0);
            //Session.set(track.keyName, 1);
