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

  var acu = this.turnNumber;
  this.turnNumber++;
  var flag = true; //si se encuentra al objeto
  var aux;

  while (flag){
    acu = (acu % this.list.length);

    aux = this._charactersById[this.list[acu]].isDead();
    if (!aux){
      this.activeCharacterId = this.list[acu];
      flag = false;
    }
    acu++;
  }
  obj.number = this.turnNumber;
  obj.activeCharacterId = this.activeCharacterId;
  obj.party = this._charactersById[obj.activeCharacterId].party;

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
