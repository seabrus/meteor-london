//playground.js
maxims = [];
players = [];

for (var i=0; i < SOUND_NUMBER; i++) {
    maxims[i] = new Maxim();
    players[i] = maxims[i].loadFile( SOUND_FILES[i] );
    players[i].setLooping(true);
}

playSound = function(n) {
	players[n].volume(1);
}

stopSound = function(n) {
	players[n].volume(0);
}

playAll = function() {
    for (var i=0; i < SOUND_NUMBER; i++) {
	    players[i].play();
    }
};

stopAll = function() {
    for (var i=0; i < SOUND_NUMBER; i++) {
	    players[i].stop();
    }
};

setSpeed = function(speed) {
    for (var i=0; i < SOUND_NUMBER; i++) {
	    players[i].speed(speed);
    }
};


/*
maxim1 = new Maxim();
maxim2 = new Maxim();
maxim3 = new Maxim();
maxim4 = new Maxim();
maxim5 = new Maxim();
player1 = maxim1.loadFile("drums1.wav");
player1.setLooping(true);
player2 = maxim2.loadFile("caxi.wav");
player2.setLooping(true);
player3 = maxim3.loadFile("arp.wav");
player3.setLooping(true);
player4 = maxim4.loadFile("hihat2.wav");
player4.setLooping(true);
//player5 = maxim5.loadFile("cymbal1.wav");
// // player2 = maxim2.loadFile("bassline.wav");
player5 = maxim5.loadFile("bongo.wav.wav");
player5.setLooping(true);


playDrums = function(){
	player1.volume(1);
}

stopDrums = function(){
	player1.volume(0);
}

playBass = function(){
	player2.volume(1);
}

stopBass = function(){
	player2.volume(0);
}

playArp = function(){
	player3.volume(1);
}

stopArp = function(){
	player3.volume(0);
};

playBassline32 = function(){
	player4.volume(1);
}

stopBassline32 = function(){
	player4.volume(0);
};

playChords = function(){
	player5.volume(1);
}

stopChords = function(){
	player5.volume(0);
};


playAll = function() {

	player1.play();
	player2.play();
	player3.play();
	player4.play();
	player5.play();
};

stopAll = function() {

	player1.stop();
	player2.stop();
	player3.stop();
	player4.stop();
	player5.stop();
};


setSpeed = function(speed) {

	player1.speed(speed);
	player2.speed(speed);
	player3.speed(speed);
	player4.speed(speed);
	player5.speed(speed);

};

*/
