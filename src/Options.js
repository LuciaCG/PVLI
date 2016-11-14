'use strict';

var EventEmitter = require('events').EventEmitter;

function Options(group) {
  EventEmitter.call(this);
  this._group = typeof group === 'object' ? group : {};
}
Options.prototype = Object.create(EventEmitter.prototype);
Options.prototype.constructor = Options;

Options.prototype.list = function () {
  return Object.keys(this._group);
};

Options.prototype.get = function (id) {
  return this._group[id];
};

Options.prototype.select = function (id) {
  // Haz que se emita un evento cuando seleccionamos una opción.
  var self = this;

  this.on('chose', function(id, data){ return data; });
  this.emit('chose', id, self.get(id));

  this.on('choseError', function(reason, id){ return reason; });
  this.emit('choseError', 'option-does-not-exist', id);
};

module.exports = Options;
