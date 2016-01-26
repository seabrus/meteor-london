/////
//   Initialization
/////
Template.home.onRendered(function() {
    var titleTag = this.data.titleTag;

    $('#title-tag').text(titleTag);
});

