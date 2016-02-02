Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loadingView',
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
    name: 'website-details',
    template: 'websiteDetails',

    subscriptions: function() {
        // this.subscribe('website', this.params.id).wait();
        // this.subscribe('comments', this.params.id).wait();
        // // var handle1 = Meteor.subscribe('website', this.params.id);
        // // var handle2 = Meteor.subscribe('comments', this.params.id);
        // // return [handle1, handle2];
        // // // return Meteor.subscribe('comments', this.params.id);
        // // // // var handle1 = Meteor.subscribe('websites', '');
        Session.setDefault('searchString', '');
        var handle1 = Meteor.subscribe('websites', Session.get('searchString'));
        // Using the subscription above, I hope that meteor does NOT re-fetch subscription for 'home'
        // But actually all that I need is   Meteor.subscribe('website', this.params.id)
        var handle2 = Meteor.subscribe('comments', this.params.id);
        return [handle1, handle2];
    },

    data: function() {
        return {
            website: Websites.find({_id: this.params.id}).fetch()[0],
            comments: Comments.find({}),
            titleTag: 'Detailed Info about ',
            // If I use the approach below, then website.title is taken from the previous website or the first site from 'home' subscription
            //   -- this is seen at meteor.com, locally it is not seen
            //website: Websites.find({}).fetch()[0],
            // Using websiteId helps, but other website data are rewritten - anyway the 1st version is from the previous website
            // and only then correct data are fetched and displayed
            //websiteId: this.params.id,
            // The most effective is:   website: Websites.find({_id: this.params.id}).fetch()[0],   -- with {_id:...}
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
