'use strict'
var Collection = require('./dw.util.Collection');

var categoryList;

var primaryCategory = {
    getParent: function() {
        var returnObj = categoryList.pop();

        if (!returnObj) {
            return null;
        }
        return returnObj;

    },
    custom: {
        sizeChartID: 'sizeguidewomens-fake'
    }
}

categoryList = [primaryCategory, primaryCategory];



module.exports = function(recommendationCount) {
    return {
        getOrderableRecommendations: function(mode) {
            var recommendations = [];
            while (recommendationCount > 0) {
                recommendations.push({
                    getRecommendedItem: function() {
                        return 'AAA'
                    }
                });
                recommendationCount--;
            }
            var col = new Collection(recommendations);

            return col;
        },
        getVariationModel: function() {
            return {
                getProductVariationAttributes: function() {
                    return [{
                        ID: 'color'
                    }]
                },
                getSelectedValue: function(value) {
                    return {
                        getImage: function() {
                            return {
                                getUrl: function() {
                                    return "dummyurl";
                                }
                            }
                        }
                    }
                }

            }
        },
        primaryCategory: primaryCategory
    }
}