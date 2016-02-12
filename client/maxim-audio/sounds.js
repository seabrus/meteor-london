maxims = [];
players = [];

for (var i=0; i < TRACK_NUMBER; i++) {
    maxims[i] = new Maxim();
    players[i] = maxims[i].loadFile( TRACK_FILES[i] );
    players[i].setLooping(true);
    players[i].title = TRACK_TITLES[i];
}


function findIndexByTitle(title) {
    for (var i=0; i < TRACK_NUMBER; i++) {
        if (title === TRACK_TITLES[i]) 
            break;
    }
    return i;
}

playTrack = function(n) {
	players[n].volume(1);
};
stopTrack = function(n) {
	players[n].volume(0);
};

playTrackWithTitle = function(title, vol) {
    var index = findIndexByTitle(title);
    if (index < TRACK_NUMBER) {
    	players[index].volume(vol);
    }
};
stopTrackWithTitle = function(title) {
    var index = findIndexByTitle(title);
    if (index < TRACK_NUMBER) {
    	players[index].volume(0);
    }
};

playAll = function() {
    for (var i=0; i < TRACK_NUMBER; i++) {
	    players[i].play();
    }
};
stopAll = function() {
    for (var i=0; i < TRACK_NUMBER; i++) {
	    players[i].stop();
    }
};

setSpeed = function(speed) {
    for (var i=0; i < TRACK_NUMBER; i++) {
        players[i].speed(speed);
    }
};
setTrackSpeed = function(title, speed) {
    var index = findIndexByTitle(title);
    if (index < TRACK_NUMBER) {
        players[index].speed(speed);
    }
};

setTrackAmplitude = function(title, amplitude) {
    var index = findIndexByTitle(title);
    if (index < TRACK_NUMBER) {
        //players[index].setAmplitude(amplitude);
        players[index].setAmplitude_SB(amplitude);
    }
};

setTrackFilterRamp = function(title, freq) {
    var index = findIndexByTitle(title);
    if (index < TRACK_NUMBER) {
        players[index].filterRamp(freq * 20000, 1.0);
    }
};
