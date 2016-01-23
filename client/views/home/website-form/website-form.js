/////
//   Session's
/////
Session.setDefault('url_error_1', false);
Session.setDefault('url_error_2', false);
Session.setDefault('title_error', false);


/////
//   Template Helpers
/////
Template.website_form.helpers({
    url_error_1: function() {
        return Session.get('url_error_1');
    },

    url_error_2: function() {
        return Session.get('url_error_2');
    },

    title_error: function() {
        return Session.get('title_error');
    },
});


/////
//   Template Events
/////
Template.website_form.events({

    "click .js-toggle-website-form": function(event) {
        $("#website_form").toggle('slow');
    },


    "submit .js-save-website-form": function(event) {
        // here is an example of how to get the url out of the form:
        var form = event.target;
        var url = form.url.value.trim();
        var title = form.title.value.trim();
        var description = form.description.value.trim();

        // URL validation 
        var urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        // see https://mathiasbynens.be/demo/url-regex and https://gist.github.com/dperini/729294

        Session.set('url_error_1', false);
        Session.set('url_error_2', false);
        if (!url) {
            //alert("Site address is required");
            Session.set('url_error_1', true);
            return false;
        }
        if (!url.match(urlRegex)) {
            //alert("Site address should be a valid URL");
            Session.set('url_error_2', true);
            return false;
        }

        // Title validation 
        Session.set('title_error', false);
        if (!title) {
            Session.set('title_error', true);
            return false;
        }

        // Save the website to DB
        if (Meteor.user()) {
            Websites.insert({
                url: url,
                title: title,
                description: description,
                createdOn: new Date(),
                createdBy: Meteor.user()._id,
                votePlus: 0,
                voteMinus: 0,
            });

            $("#website_form").toggle('slow'); // Close the form
        }

        return false; // stop the form submit from reloading the page
    },


    "click .js-clear-form": function(event) {
        Session.set('url_error_1', false);
        Session.set('url_error_2', false);
        Session.set('title_error', false);

        var form = $('form').get(0);
        form.url.value = '';
        form.title.value = '';
        form.description.value = '';

        return false; // stop the form submit from reloading the page
    },

});



