/////
//   Session's
/////
Session.setDefault('url_error_required', false);
Session.setDefault('url_error_invalid', false);
Session.setDefault('title_error', false);


/////
//   Template Helpers
/////
Template.website_form.helpers({
    url_error_required: function() {
        return Session.get('url_error_required');
    },

    url_error_invalid: function() {
        return Session.get('url_error_invalid');
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
        $('#website_form').toggle('slow');
    },


    "submit .js-save-website-form": function(event) {
        // here is an example of how to get the url out of the form:
        var form = event.target;
        var url = form.url.value.trim();
        var title = form.title.value.trim();
        var description = form.description.value.trim();

        // URL validation 
        Session.set('url_error_required', false);
        Session.set('url_error_invalid', false);

        var isUrlValid = Meteor.__validateUrl(url);   // see lib/auxiliary-functions/auxiliary-functions.js

        if (isUrlValid === URL_ERROR_REQUIRED) {
            Session.set('url_error_required', true);
            form.url.focus();
            return false;
        }
        if (isUrlValid === URL_ERROR_INVALID) {
            Session.set('url_error_invalid', true);
            form.url.focus();
            return false;
        }

        // Title validation 
        Session.set('title_error', false);
        if (!title) {
            Session.set('title_error', true);
            form.title.focus();
            return false;
        }

        // Save the website to DB
        if (Meteor.user()) {
            Websites.insert({
                url: url,
                title: title,
                description: description,
                createdOn: new Date(),
                createdBy: Meteor.user().username || 'User without name',  //Meteor.users.find({_id: id}).fetch()[0];
                votePlus: 0,
                voteMinus: 0,
            });

            $('#website_form').toggle('slow'); // Close the form
        }

        return false; // stop the form submit from reloading the page
    },


    "click .js-clear-form": function(event) {
        Session.set('url_error_required', false);
        Session.set('url_error_invalid', false);
        Session.set('title_error', false);

        var form = $('form').get(0);
        form.url.value = '';
        form.title.value = '';
        form.description.value = '';

        return false; // stop the form submit from reloading the page
    },


    "blur #url": function(event) {
        var url = event.target.value.trim();
        var isUrlValid = Meteor.__validateUrl(url);

        if (isUrlValid === VALID_URL) {
            $('#loading-gif').show();

            Meteor.call('getTitle', url, function(error, result) {
                if (error)  {
                    $('#loading-gif').hide('slow');
                    console.log('website-form.js--getTitle error: ' + error.reason);
                    return alert(error.reason);
                }

                //alert('result.title = ' + result.title);
                if (result.title) {
                    $('#title').val(result.title);
                    $('#description').val(result.description);
                }
                $('#loading-gif').hide('slow');
            });

        } // end of "if (isUrlValid === VALID_URL)"

        //event.preventDefault;
        //return false; // stop the form submit from reloading the page
    },

});



