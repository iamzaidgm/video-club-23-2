const mongoose = require('mongoose');

// Schema
const schema = mongoose.Schema({
    _description:String,
});

//Clase
class Genre {
    constructor(description){
        this._description = description;
    }

    get description(){
        return this._description;
    }

    set description(v){
        this._description;
    }

}

schema.loadClass(Genre);
module.exports = mongoose.model('Genre', schema)