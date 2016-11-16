'use strict';
var dice = require('./dice');

function Character(name, features) {
  features = features || {};
  this.name = name;
  // Extrae del parámetro features cada característica y alamacénala en
  // una propiedad.
  this.party = features.party || null;
  this.initiative = features.initiative || 0;
  this.defense = features.defense || 0;
  this.weapon = features.weapon || null;
  this._mp = features.mp || 0;
  this._hp = features.hp || 0;
  this.maxMp = features.maxMp || this._mp || 0;
  this.maxHp = features.maxHp || this._hp || 15;
}

Character.prototype._immuneToEffect = ['name', 'weapon'];

Character.prototype.isDead = function () {
	if(this._hp <= 0) return true;
	else return false;
};

Character.prototype.applyEffect = function (effect, isAlly) {
  // Implementa las reglas de aplicación de efecto para modificar las
  // características del personaje. Recuerda devolver true o false según
  // si el efecto se ha aplicado o no.
  if (!isAlly)
    if (dice.d100() <= this.defense)
        return false;

  this.initiative += effect.initiative;
  this.defense += effect.defense;
  this._mp += effect.mp;
  this._hp += effect.hp;
  this.maxMp += effect.maxMp;
  this.maxHp += effect.maxHp;

  return true;

};

Object.defineProperty(Character.prototype, 'mp', {
  get: function () {
    return this._mp;
  },
  set: function (newValue) {
    this._mp = Math.max(0, Math.min(newValue, this.maxMp));
  }
});

Object.defineProperty(Character.prototype, 'hp', {
  // Puedes usar la mísma ténica que antes para mantener el valor de hp en el
  // rango correcto.
  get: function () {
    return this._hp;
  },
  set: function (newValue) {
    this._hp = Math.max(0, Math.min(newValue, this.maxHp));
  }
});

Object.defineProperty(Character.prototype, 'defense', {
  get: function () {
    return this._defense;
  },
  set: function (newValue) {
    this._defense = Math.max(0, Math.min(newValue, 100));
  }
});

module.exports = Character;
