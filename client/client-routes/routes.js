Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loadingView'
});


Router.route('/', {
    name: 'home',
    template: 'home',

    subscriptions: function() {
        Session.setDefault('searchString', '');
        return Meteor.subscribe('websites', Session.get('searchString'));
        //this.subscribe('websites', Session.get('searchString')).wait();
    },

    data: function() {
        return {
            websites: function() {
                Session.setDefault('websitesPerPageLimit', 10);
                return Websites.find({},
                    {
                        sort: [['votePlus', 'desc'], ['voteMinus', 'desc']],
                        limit: Session.get('websitesPerPageLimit')
                    }
                );
            },
            titleTag: 'SiteAce SB - Final Assignment | Introduction to Meteor.js - Coursera',
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
            titleTag: 'Detailed Info about ',
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
