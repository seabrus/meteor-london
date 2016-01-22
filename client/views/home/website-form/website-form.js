Template.website_form.events({

    "click .js-toggle-website-form": function(event) {
        $("#website_form").toggle('slow');
    },

    "submit .js-save-website-form": function(event) {

        // here is an example of how to get the url out of the form:
        var form = event.target;
        var url = form.url.value;
        var title = form.title.value;
        var description = form.description.value;
        //console.log("The url they entered is: " + url);

        //  put your website saving code in here
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
        }


        return false; // stop the form submit from reloading the page
    }
});



