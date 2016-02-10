// ===========================================================
//   Subscription
// ===========================================================
Template.playground.onCreated(function() {
    var templateInstance = this;
    templateInstance.autorun(function() {
        templateInstance.subscribe('musicMachine');
    });
});


// ===========================================================
//   Helpers
// ===========================================================
Template.playground.helpers({

    notReady: function() {
        return !Template.instance().subscriptionsReady();
    },

    isPlaying: function() {
        var isPlaying = MusicMachine.findOne({title: 'all'}).isPlaying;
        if (isPlaying) { playAll(); }
        else { stopAll(); }
        return isPlaying;
    },

    tracks: function() {
        return MusicMachine.find({title: {$ne: 'all'}});
    },
});


/*
var trackHelpers = {};
for (var i=0; i < TRACK_NUMBER; i++) {
  (function(n) {
    trackHelpers[ TRACK_KEYS[n] ] = function() {
        var track = MusicMachine.findOne({ title: TRACK_TITLES[n] });
        if (track) {
            if (track.isPlaying) {
                playTrack(n);
            } 
            else {
                stopTrack(n);
            }
        }

        return 1;
    };
  })(i);
}
Template.playground.helpers(trackHelpers);
*/


// ===========================================================
//   Events
// ===========================================================
Template.playground.events({

     'click button.js-play-all': function(event) {
        var all = MusicMachine.findOne({title: 'all'});
        if (all.isPlaying) {
            MusicMachine.update({_id: all._id}, {$set: {isPlaying: false}});
        }
        else {
            MusicMachine.update({_id: all._id}, {$set: {isPlaying: true}});
        }
    },

});



/*
    sliderVal1: function() { 
        var slider = MusicMachine.findOne({title: 'all'});
        if (slider) { 
            $('#slider1').data('uiSlider').value(slider.speed);
            setSpeed(slider.speed/50);
            return slider.speed;
        }
    },
*/
