// https://github.com/meteor-blog/meteor-blog/
Blog.config({
    title: "Portfolio Website",

    blogIndexTemplate: 'blogIndexTemplate', // '/blog' route
    blogShowTemplate: 'blogItemTemplate',    // '/blog/:slug' route

    adminRole: 'blogAdmin',
    authorRole: 'blogAuthor',

    rss: {
        title: 'My Portfolio Website',
        description: 'This is an example of a portfolio website'
    },
});


// https://atmospherejs.com/liberation/shareit
if (Meteor.isClient) {
    ShareIt.init({
        siteOrder: ['twitter', 'facebook', 'pinterest'],
        sites: {
            'facebook': {
                'appId': null   // use sharer.php when it's null, otherwise use share dialog
            },
            'twitter': {},
//            'googleplus': {},
            'pinterest': {}
        },
        iconOnly: false,
        applyColors: true,
    });
}
