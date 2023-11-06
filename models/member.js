const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _name: String,
    _lastName: String,
    _phone: String,
    _addreess: {
        street: String,
        number: String,
        zip: String,
        city: String,
        state: String,
        country: String
    }
});

class Member {
    constructor(name, lastName, phone, address){
        this._name = name;
        this._lastName = lastName;
        this._phone = phone;
        this._address = address;
    }

    get name(){
        return this._name;
    }

    set name(v){
        this._name = v;
    }

    get lastName(){
        return this._lastName;
    }

    set lastName(v){
        this._lastName = v;
    }

    get phone(){
        return this._phone;
    }

    set phone(v){
        this._phone = v;
    }

    get address(){
        return this._addreess;
    }

    set address(v){
        this._addreess = v;
    }
}

schema.loadClass(Member);
schema.plugin(mongoosePaginate);
module.exports = mongoose.model('Member', schema)