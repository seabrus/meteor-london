// =================================================
//   Template Helpers
// =================================================
Template.commentItem.helpers({
    formatDate: function(date) {
        return date.toISOString().slice(0, 10);
    },

    isEven: function(index) {
        return (index + 1) % 2;
    },
});


// =================================================
//   Template Events
// =================================================
/*
Template.commentItem.events({

});
*/

