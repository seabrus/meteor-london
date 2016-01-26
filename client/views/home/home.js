/////
//   Initialization
/////
Template.home.onRendered(function() {
    var routeData = Router.current().data();
    var titleTag = routeData.titleTag;

    $('#title-tag').text(titleTag);
    routeData = null;
});

