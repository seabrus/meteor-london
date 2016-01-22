Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loadingView'
});

Router.route('/', function() {
    this.render('home');
});


Router.onBeforeAction(function () {
    if (Meteor.loggingIn()) {
        this.render('loadingView');
    } else {
        this.next();
    }
});




/*
Router.route('/images', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('images', {
    to:"main"
  });
});

Router.route('/image/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('image', {
    to:"main", 
    data:function(){
      return Images.findOne({_id:this.params._id});
    }
  });
});
*/
