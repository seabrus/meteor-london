Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loadingView'
});


Router.route('/', {
    name: 'home',
    template: 'home',

    subscriptions: function() {
        this.subscribe('websites').wait();
    },

    action: function() {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loadingView');
        }
    },
});


Router.route('/website-details/:id', {
    name: 'website_details',
    template: 'website_details',

    subscriptions: function() {
        this.subscribe('website', this.params.id).wait();
        this.subscribe('comments', this.params.id).wait();
    },

    data: function() {
        return {
            website: Websites.find({}).fetch()[0],
            comments: Comments.find({}),
        };
    },

    action: function() {
        if (this.ready()) {
            this.render();
        } else {
            this.render('loadingView');
        }
    },
});


Router.onBeforeAction(function() {
    if (Meteor.loggingIn()) {
        this.render('loadingView');
    } else {
        this.next();
    }
});
