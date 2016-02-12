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
            min: 1,
            max: 100,
        });
        speedSliderDiv.data('uiSlider').value(track.speed);
    }


    // Volume Slider initialization
    var volumeSliderHandler = _.throttle( 
        function(event, ui) {
            MusicMachine.update({_id: track._id}, {$set: {volume: ui.value}});
        }, 
        50, 
        {leading: false}
    );
    var volumeSliderDiv = templateInstance.$('#' + track.keyName + '_2');
    if ( !volumeSliderDiv.data('uiSlider') ) {
        volumeSliderDiv.slider({
            slide: volumeSliderHandler,
            min: 1,
            max: 100,
        });
        volumeSliderDiv.data('uiSlider').value(track.volume);
    }


    // AUTORUN -- Trace Changes 
    templateInstance.autorun(function() {
        var dbTrack = MusicMachine.findOne({_id: track._id});

        if (dbTrack.isPlaying) { 
            playTrackWithTitle(dbTrack.title, dbTrack.volume/50);
        } else { 
            stopTrackWithTitle(dbTrack.title); 
        }

        // Volume slider
        var data = volumeSliderDiv.data('uiSlider');
        if (dbTrack && data) { 
            data.value(dbTrack.volume);
        }
        templateInstance.$('.js-volume-value').text(dbTrack.volume);

        // Speed slider
        var data = speedSliderDiv.data('uiSlider');
        if (dbTrack && data) { 
            data.value(dbTrack.speed);
        }
        setTrackSpeed(dbTrack.title, dbTrack.speed/50);
        templateInstance.$('.js-speed-value').text(dbTrack.speed);

    }); // end of   "autorun..."

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


// ===========================================================
//   Helpers
// ===========================================================
//Template.trackItem.helpers({
/*
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
*/
//});
