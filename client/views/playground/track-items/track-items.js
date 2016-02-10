// ===========================================================
//   Initialization
// ===========================================================
Template.trackItem.onRendered(function() {
    var templateInstance = this;

    var track = Template.currentData().track;
    var sliderHandler = _.throttle( 
        function(event, ui) {
            MusicMachine.update({_id: track._id}, {$set: {speed: ui.value}});
        }, 
        50, 
        {leading: false}
    );

    var sliderDiv = templateInstance.$('#' + track.keyName);

    if (!sliderDiv.data('uiSlider')) {
        sliderDiv.slider({
            slide: sliderHandler,
            min: 0,
            max: 100,
        });
        sliderDiv.data('uiSlider').value(track.speed);
    }
});


// ===========================================================
//   Helpers
// ===========================================================
Template.trackItem.helpers({

    sliderVal: function() { 
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
