'use strict'

var content = {
    'uk-size-warning': createContent('dummydataSIZE_CHART_ID_VALUEdummydata')
}

function createContent(data) {
    return {
        custom: {
            body: data
        }
    }
}
module.exports = {
    ContentMgr: {
        getContent: function(key) {
            return content[key];
        }
    }
}