//   Any client-provided information passed to methods should be run through the check package
//   Ensure authentication checks exist for each Meteor.method  --  Always check the user - he/she should be logged in!


// ===============================================================================
//   Match pattern
// ===============================================================================
ValidURL = Match.Where(function(x) {
    var result = Meteor.__validateUrl(x);   // see /lib/auxiliary-functions/auxiliary-functions.js
    return !result;
});

Meteor.methods({
  // ===============================================================================
  //   Retrieve the title tag and meta description from a website with a specified URL
  // ===============================================================================
    getTitle: function(url) {
        if (this.userId  &&  Match.test(url, ValidURL)) {
            //this.unblock(); // see more at https://themeteorchef.com/snippets/using-unblock-and-defer-in-methods/
            var response = null;
            var websiteInfo = {title: '', description: ''};

            var titleReg = /<title[^>]*>[\s\S]*<\/title>/i;
            var titleTextReg = />[^<]*</i;
            var descriptionReg = /<meta[^>]*name=(['"]?)description\1[^>]*?>/i;
            var contentReg = /content=(['"])[\s\S]*?\1/i;

            try {
                response = HTTP.get(url, {timeout: 3000});

                if (response.content) {
                    var isTitle = response.content.match(titleReg);
                    if (isTitle) {
                        var isTitleText = isTitle[0].match(titleTextReg);
                        if (isTitleText) {
                            var title = isTitleText[0].slice('>'.length, -1);
                            websiteInfo.title = title.trim(); //$(response.content).filter('title').text(); -- NO jQuery on server, sorry
                        }
                    }

                    var isDescription = response.content.match(descriptionReg);
                    if (isDescription) {
                        var isContent = isDescription[0].match(contentReg);
                        if (isContent) {
                            var content = isContent[0].slice('content="'.length, -1);
                            websiteInfo.description = content.trim();
                        }
                    }
                } // end of "if (response.content)..."

                response = null;
                return websiteInfo;
            }
            catch(e) {
                console.log('SERVER methods.js--getTitle error: ' + e.message);
                throw new Meteor.Error('gettitle-error', 'Error in getTitle');
            } // end of "try-catch" block

        } else {
            console.log( 'SERVER methods.js--getTitle: ATTENTION - The user is NOT logged in or URL is broken' );
            throw new Meteor.Error('no-access', 'Server error 11');
        } // end of "if (this.userId..."

    },
});
