const express = require('express');
const Member = require('')

function create(req, res, next){
    let name = req.body.name;
    let lastName = req.body.lastName;
    let phone = req.body.phone;
    
    let address = new Object();
    address.street = req.body.street;
    address.number = req.body.number;
    address.zip = req.body.zip;
    address.city = req.body.city;
    address.state = req.body.state;
    address.country = req.body.country;

    let member = new Member({
        name: name,
        lastName: lastName,
        phone: phone,
        addresss: address
    });

    member.save().then(obj => res.status(200).json({
        msg: "Socio creado",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: "No se a podido crear el socio"
    }));
}

function list(req, res, next) {
    User.find().then(objs => res.status(200).json({
        message: "Lista de usuarios",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se pudo consultar la lista de usuarios",
        obj: ex
    }));
  }

function index(req, res, next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Usuario con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:"No se pudo consultar el usuario",
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let email = req.body.email ? req.body.email : "";
    let password = req.body.password ? req.body.password : "";

    let User = new Object({
        _name:name,
        _lastName:lastName,
        _email:email,
        _password:password
    });

    User.findOneAndUpdate({"_id":id}, User, {new: true})
        .then(obj => res.status(200).json({
            msg:"Usuario reemplazado correctamente", 
            obj:obj
        })).catch(ex => res.status(500).json({
            msg:"No se pudo reemplazar el usuario",
            obj: ex
        }));
}

function update(req, res, next){
    const id = req.params.id;
    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    let User = new Object();
    if(name) User._name = name;
    if(lastName) User._lastName;
    if(email) User._email = email;
    if(password) User._password;

    User.findOneAndUpdate({"id":id}, User)
        .then(obj => res.status(200).json({
            msg:"Usuario actualizado correctamente", 
            obj:obj
        })).catch(ex => res.status(500).json({
            msg:"No se pudo actualizar el usuario",
            obj: ex
        }));
}

function destroy(req, res, next){
    const id = req.params.id;
    User.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg:"Usuario borrado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:"No se pudo eliminar el usuario",
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};