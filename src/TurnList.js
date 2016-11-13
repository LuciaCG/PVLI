'use strict';

function TurnList() {}

TurnList.prototype.reset = function (charactersById) {
  this._charactersById = charactersById;

  this._turnIndex = -1;
  this.turnNumber = 0;
  this.activeCharacterId = null;
  this.list = this._sortByInitiative(); //esto es un array
};

TurnList.prototype.next = function () {
  // Haz que calcule el siguiente turno y devuelva el resultado
  // según la especificación. Recuerda que debe saltar los personajes
  // muertos.
  var obj = { number: 0, party: null, activeCharacterId: null };

  this.turnNumber++;
  var acu = 0;
  var flag = true;

  while (flag && acu < this.list.length){
    if (!this._charactersById[this.list[acu]]._isDead){ //si no esta muerto
      obj.number = this.turnNumber; //esto esta bien
      this.activeCharacterId = this.list[acu];
      obj.activeCharacterId = this.activeCharacterId;
      obj.party = this._charactersById[obj.activeCharacterId].party;
      flag = false;
    }
    acu++;
  }

  return obj;
};

TurnList.prototype._sortByInitiative = function () {
  // Utiliza la función Array.sort(). ¡No te implementes tu propia
  // función de ordenación!
  var self = this;
  var keyArray = Object.keys (self._charactersById);

  keyArray.sort(function (a,b) 
    {
    //a y b son keys de keyArray con las que podemos acceder a this._charactersByID[a] ....
      return self._charactersById[b].initiative - self._charactersById[a].initiative;
    });

  return keyArray;
};

module.exports = TurnList;
