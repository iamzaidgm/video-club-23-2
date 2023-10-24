const mongoose = require('mongoose');

// Schema
const schema = mongoose.Schema({
    _name:String,
    _lastName:String
});

//Clase
class Actor {
    constructor(name, lastName){
        this._name = name;
        this._lastName = lastName;
    }

    get name(){
        return this._name;
    }

    set name(v){
        this._name;
    }

    get lastName(){
        return this._lastName;
    }

    set lastName(v){
        this._lastName;
    }
}

schema.loadClass(Actor);
module.exports = mongoose.model('Actor', schema)