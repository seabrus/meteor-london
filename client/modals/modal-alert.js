// =================================================
//   Sessions
// =================================================
Session.setDefault('alertType', 'alert');
Session.setDefault('notShowModalAlert', false);
Session.setDefault('recommenderText', '');


// =================================================
//   Template Events
// =================================================
Template.modalAlert.events({
    'click .js-yes': function(event) {
        $("#modal-alert").modal('hide');

        var searchText = Session.get('recommenderText');
        Session.set('searchString', searchText);

        if (Router.current().route.getName() !== 'home') {
            Router.go('home');
        }

        return false;
    },


    'change .js-not-show-modal-alert': function(event) {
        if (event.target.value === 'NOT_SHOW_MODAL_ALERT') {
            Session.set('notShowModalAlert', true);
        }
        else {
            Session.set('notShowModalAlert', false);
        }

        return false;
    },

}); // end of "Template.modalAlert.events..."


// =================================================
//   Template Helpers
// =================================================
Template.modalAlert.helpers({
    isAlert: function() {
        return Session.get('alertType') === 'alert';
    },

    isConfirm: function() {
        return Session.get('alertType') === 'confirm';
    },

});


// =================================================
//  Meteor.__modalAlert   auxiliary function
//
//  @param {string} alertText
//  @param {string} alertType -- Can be "alert" or "confirm"
//  @param {string} recommenderText
// =================================================
Meteor.__modalAlert = function(alertText, alertType, recommenderText) {
    var messageText = alertText || '';
    $('#modal-alert-text').text(messageText);

    var messageType = alertType || 'alert'; 
    Session.set('alertType', messageType);

    if (recommenderText) {
        Session.set('recommenderText', recommenderText);
    }

    $("#modal-alert").modal('show');
};
