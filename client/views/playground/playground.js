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
//   Initialization
// ===========================================================
Template.playground.onRendered(function() {
    var templateInstance = this;

    //templateInstance.$('h2').hide();
    //console.log('templateInstance.$(h2).length = ' + templateInstance.$('h2').length)
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


   //return Session.get( TRACK_KEYS[n] );

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
/*
    sliderId: function(index) {
        return 'slider' + index;
    },

    "click button.js-track": function(event) {
        var button = $(event.target);
        var trackId = button.data('trackid');
        var track = MusicMachine.findOne({_id: trackId});

        if (track.isPlaying) {
            //Session.set(sound.keyName, 1);
            MusicMachine.update({_id: trackId}, {$set: {isPlaying: false}});
            //button.text('Off');
        }
        else {
            //Session.set(sound.keyName, 0);
            MusicMachine.update({_id: trackId}, {$set: {isPlaying: true}});
            //button.text('On');
        }
    },

    "click button.js-sound-1": function(event) {
        var button = $(event.target);
        if (button.text() === 'On') {
            Session.set('drums', 1);
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {drums: 1}});
            button.text('Off');
        }
        else {
            Session.set('drums', 0);
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {drums: 0}});
            button.text('On');
        }
    },
*/
/*
    "drums": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.drums==1) {
          playDrums();

        } else if (starter.drums==0) {

          stopDrums();

        }
      }

      return Session.get('drums');
    },
*/

