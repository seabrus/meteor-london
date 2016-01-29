// ===========================================
//   Auxiliary functions
// ===========================================

VALID_URL = 0;
URL_ERROR_REQUIRED = 1;
URL_ERROR_INVALID = 2;

Meteor.__validateUrl = function(url) {

    var urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    // see https://mathiasbynens.be/demo/url-regex   and   https://gist.github.com/dperini/729294

    if (!url) {
        return URL_ERROR_REQUIRED;
    }
    if (!url.match(urlRegex)) {
        return URL_ERROR_INVALID;
    }
    return VALID_URL;
};
