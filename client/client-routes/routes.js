Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loadingView'
});

Router.route('/', function() {
    this.render('home');
});

Router.route('/website-details/:id', function() {
    this.render('website_details', {
        data: function() {
            return {
                website: Websites.findOne({_id: this.params.id}),
                comments: Comments.find({websiteId: this.params.id}),
            };
        }
    });
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
*/
