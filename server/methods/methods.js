//   Any client-provided information passed to methods should be run through the check package
//   Ensure authentication checks exist for each Meteor.method  --  Always check the user - he/she should be logged in!

ValidURL = Match.Where(function(x) {
    var result = Meteor.__validateUrl(x);
    return !result;
});

Meteor.methods({
  // ============================================================
  //   Get the title of the website with specified URL
  // ============================================================
    getTitle: function(url) {
        if (this.userId  &&  Match.test(url, ValidURL)) {
            //this.unblock(); // see https://themeteorchef.com/snippets/using-unblock-and-defer-in-methods/
            var response = null;
            var websiteInfo = {title: '', description: ''};
            var titleReg = /<title>[\s\S]*<\/title>/;
//            var descriptionReg = /<meta[\s\S]*?name=(['"]?)description\1[\s\S]*?>/;
            var descriptionReg = /<meta[^>]*name=(['"]?)description\1[\s\S]*?>/;
//gg = /<meta\sname=\"description\"[\s\S]*?>/
            var contentReg = /content=(['"])[\s\S]*?\1/;

            try {
                response = HTTP.get(url);

                if (response.content) {
                    var isTitle = response.content.match(titleReg);
                    if (isTitle) {
                        var title = isTitle[0].slice('<title>'.length, isTitle[0].indexOf('</title>'));
                        websiteInfo.title = title.trim(); //$(response.content).filter('title').text(); -- NO jQuery on server, sorry
                    }

                    var isDescription = response.content.match(descriptionReg);
console.log('isDescription = ' + isDescription);
                    if (isDescription) {
                        var isContent = isDescription[0].match(contentReg);
console.log('isContent = ' + isContent);
                        if (isContent) {
                            var content = isContent[0].slice('content="'.length, -1);
                            websiteInfo.description = content.trim();
console.log('content = ' + websiteInfo.description);
                        }
                    }
                } // end of "if (response.content)..."

                response = null;
                return websiteInfo;
            }
            catch(e) {
                console.log('methods.js--getTitle error: ' + e.message);
                throw new Meteor.Error('gettitle-error', 'Error in getTitle');
            } // end of "try-catch" block

        } else {
            console.log( 'methods.js # getTitle: ATTENTION - The user is NOT logged in or URL is broken' );
            throw new Meteor.Error('no-access', 'Server error 11');
        } // end of "if (this.userId..."

    },
});
