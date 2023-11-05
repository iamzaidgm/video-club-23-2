const express = require('express');
const Actor = require('../models/actor');


function create(req, res, next){
    const name = req.body.name;
    const lastName = req.body.lastName;

    let Actor = new Actor({
        name:name, 
        lastName:lastName
    });

    actor.save()
            .then(obj => res.status(200).json({
                message:"Actor creado correctamente", 
                obj:obj
            })).catch(ex => res.status(500).json({
                message:"No se pudo almacenar al actor",
                obj:ex
            }));  

}

function list(req, res, next) {
    let page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5
    }

    Actor.paginate({}, options)
            .then(objects => res.status(200).json({
                message: "Lista de actores",
                obj: objects
            })).catch(ex => res.status(500).json({
                message: "La lista de actores no se puede mostrar",
                obj: ex
            }));
}

function index(req, res, next){
    const id = req.params.id;

    Actor.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Actor con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:`No se pudo consultar el Actor con el id ${id}`,
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;

    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";

    let Actor = new Object({
        _name:name,
        _lastName:lastName
    });

    Actor.findOneAndUpdate({"_id":id}, Actor, {new: true})
        .then(obj => res.status(200).json({
            msg:"Actor reemplazado correctamente", 
            obj:obj
        })).catch(ex => res.status(500).json({
            msg:"No se pudo reemplazar el Actor",
            obj: ex
        }));
}

function update(req, res, next){
    const id = req.params.id;

    let name = req.body.name;
    let lastName = req.body.lastName;

    let Actor = new Object();

    if(name) Actor._name = name;
    if(lastName) Actor._lastName;

    Actor.findOneAndUpdate({"id":id}, Actor)
        .then(obj => res.status(200).json({
            msg:"Actor actualizado correctamente", 
            obj:obj
        })).catch(ex => res.status(500).json({
            msg:"No se pudo actualizar el Actor",
            obj: ex
        }));
}

function destroy(req, res, next){
    const id = req.params.id;
    
    Actor.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg:"Actor borrado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:"No se pudo eliminar el Actor",
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};