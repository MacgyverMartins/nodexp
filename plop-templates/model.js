var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const _modelName_Schema = new mongoose.Schema({

});

_modelName_Schema.plugin(timestamps);

/**
 * @typedef _modelName_
 */
var _modelName_ = mongoose.model('_modelName_', _modelName_Schema);
module.exports = _modelName_; 
