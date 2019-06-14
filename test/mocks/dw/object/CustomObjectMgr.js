'use strict';

var ArrayList = require('../../../mocks/dw.util.Collection');
var CompetitionModel = require('../../models/competitionEntry');

var customObjects = {
    'CompetitionEntry': createCompetitionEntry()
}

var sizeGuideObjects = {
    'sizeguidewomens-fake':  createSizeGuideChart('sizeguidewomens-fake')
}

function createCompetitionEntry() {
    return new ArrayList([CompetitionModel.createCompetitionModel()]).iterator();
}

function createSizeGuideChart(value) {
    return {
        custom: {
            sizeGuideId: value
        }
    }
}
function queryCustomObjects(objectType) {
    return customObjects[objectType];
}

function getCustomObject(type, keyValue) {
    if(type == 'SIZE_GUIDE_CHART') {
        return sizeGuideObjects[keyValue];
    }
    return customObjects[type]
}

module.exports = {
    queryCustomObjects: queryCustomObjects,
    getCustomObject: getCustomObject
}