const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

// Schema
const schema = mongoose.Schema({
    _name:String,
    _lastName:String
});

//Clase
class Director {
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

schema.loadClass(Director);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Director', schema)