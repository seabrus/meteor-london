/////
//   Template Helpers
/////
Template.comment_item.helpers({
    formatDate: function(date) {
        return date.toISOString().slice(0, 10);
    },

    isEven: function(index) {
        return (index + 1) % 2;
    },
});


/////
//   Template Events
/////
/*
Template.comment_item.events({

});
*/

