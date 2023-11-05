const express = require('express');
const User = require('../models/user');


function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    let User = new User({
        name:name,
        lastName:lastName,
        email:email,
        password:password
    });

    User.save().then(obj => res.status(200).json({
        message:"Usuario creado correctamente", 
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se pudo almacenar al usuario",
        obj:ex
    }));  

}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5
    }

    User.paginate({}, options)
        .then(objects => res.status(200).json({
            message: "Users list",
            obj: objects
        })).catch(ex => res.status(500).json({
            message: "Users list could not be showed",
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