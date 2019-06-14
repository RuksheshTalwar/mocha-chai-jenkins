'use strict'

var linkedHashMap = {
    put: function(key, value) {
        linkedHashMap[key] = value;
    }
}
module.exports = {
    LinkedHashMap: function() {
        return linkedHashMap;
    }
}