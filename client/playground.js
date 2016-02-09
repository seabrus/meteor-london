// ===========================================================
//   Subscription
// ===========================================================
Template.playground.onCreated(function() {
    var templateInstance = this;

    templateInstance.autorun(function () {
        templateInstance.subscribe('musicMachine');
    });
});


// ===========================================================
//   Sessions
// ===========================================================
Session.setDefault('startAll', false);

for (var i=0; i < SOUND_NUMBER; i++) {
    Session.setDefault( SOUND_KEYS[i], 0 );
}


// ===========================================================
//   Initialization
// ===========================================================
Template.playground.onRendered(function() {
    $('h2').hide();

    var handler = _.throttle( 
        function(event, ui) {
            var dbDoc = MusicMachine.findOne({title: 'all'});
            MusicMachine.update({_id: dbDoc._id}, {$set: {speed: ui.value}});
        }, 
        50, 
        {leading: false}
    );
    
    if ( !$('#slider1').data('uiSlider')) {
alert('UUUU')
        $("#slider1").slider({
            slide: handler,
            min: 0,
            max: 100,
        });
    }

});


// ===========================================================
//   Helpers
// ===========================================================
Template.playground.helpers({

    startAll: function() {
        var startAll = Session.get('startAll');

        if (startAll) { playAll(); }
        else { stopAll(); }

        return startAll;
    },

    sounds: function() {
        return MusicMachine.find({title: {$ne: 'all'}});
    },
    sliderId: function(index) {
        return 'slider' + index;
    },


    sliderVal1: function() { 
        var slider = MusicMachine.findOne({title: 'all'});
        if (slider) { 
            $('#slider1').data('uiSlider').value(slider.speed);
            setSpeed(slider.speed/50);
            return slider.speed;
        }
    },

});

soundHelpers = {};
for (var i=0; i < SOUND_NUMBER; i++) {
  (function(n) {
    soundHelpers[ SOUND_KEYS[n] ] = function() {
        var sound = MusicMachine.findOne({ title: SOUND_NAMES[n] });
        if (sound) {
            if (sound.isPlaying) {
              playSound(n);
            } 
            else {
                stopSound(n);
            }
        }

        return Session.get( SOUND_KEYS[n] );
    };
  })(i);
} // end of "for (var i=0; ..."

Template.playground.helpers(soundHelpers);


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

    "bass": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.bassline==1) {
          playBass();
        } 
        else if (starter.bassline==0) {
          stopBass();
        }
      }
      return Session.get('bass');
    },

    "arp": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.arp==1) {
          playArp();
        } 
        else if (starter.arp==0) {
          stopArp();
        }
      }
      return Session.get('arp');
    },

    "bassline32": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.bassline32==1) {
          playBassline32();

        } else if (starter.bassline32==0) {

          stopBassline32();

        }
      }
      return Session.get('bassline32');
    },

    "chords": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.chords==1) {
          playChords();

        } else if (starter.chords==0) {

          stopChords();

        }
      }
      return Session.get('chords');
    },
*/


// ===========================================================
//   Events
// ===========================================================
Template.playground.events({

     'click button.js-start-all': function(event) {
        var button = $(event.target);
        var dbDoc = MusicMachine.findOne({title: 'all'});

        if (button.text() === 'Start') {
            Session.set('startAll', true);
            MusicMachine.update({_id: dbDoc._id}, {$set: {isPlaying: true}});
            button.text('Stop');
        }
        else {
            Session.set('startAll', false);
            MusicMachine.update({_id: dbDoc._id}, {$set: {isPlaying: false}});
            button.text('Start');
        }

    },

    "click button.js-sound": function(event) {
        var button = $(event.target);
        var soundId = button.data('soundid');
        var sound = MusicMachine.findOne({_id: soundId});

        if (button.text() === 'On') {
            Session.set(sound.keyName, 1);
            MusicMachine.update({_id: soundId}, {$set: {isPlaying: true}});
            //button.text('Off');
        }
        else {
            Session.set(sound.keyName, 0);
            MusicMachine.update({_id: soundId}, {$set: {isPlaying: false}});
            //button.text('On');
        }
    },

});

/*
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

    "click button.js-sound-2": function(event) {
        var button = $(event.target);
        if (button.text() === 'On') {
            Session.set('bass', 1);
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {bassline: 1}});
            button.text('Off');
        }
        else {
            Session.set('bass', 0);
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {bassline: 0}});
            button.text('On');
        }
    },


    "click button.js-sound-3": function(event) {
        var button = $(event.target);
        if (button.text() === 'On') {
            Session.set('arp', 1);
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {arp: 1}});
            button.text('Off');
        }
        else {
            Session.set('arp', 0);
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {arp: 0}});
            button.text('On');
        }
    },


    "click button.js-sound-4": function(event) {
        var button = $(event.target);
        if (button.text() === 'On') {
            Session.set('bassline32', 1);
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {bassline32: 1}});
            button.text('Off');
        }
        else {
            Session.set('bassline32', 0);
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {bassline32: 0}});
            button.text('On');
        }
    },

    "click button.js-sound-5": function(event) {
        var button = $(event.target);
        if (button.text() === 'On') {
            Session.set('chords', 1);
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {chords: 1}});
            button.text('Off');
        }
        else {
            Session.set('chords', 0);
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {chords: 0}});
            button.text('On');
        }
    },
*/
