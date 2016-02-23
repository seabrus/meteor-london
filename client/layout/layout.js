// ===========================================================
//   Global Subscriptions
// ===========================================================
Template.applicationLayout.onCreated(function() {
    var templateInstance = this;

    templateInstance.autorun(function() {
        templateInstance.subscribe('companions');
        templateInstance.subscribe('chats');
    });

});

