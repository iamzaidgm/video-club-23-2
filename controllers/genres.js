const express = require('express');
const Genre = require('../models/genre');

function create(req, res, next){
    const description = req.body.description;
    const status = req.body.status;

    let Genre = new Genre({
        description:description,
        status:status
    });

    Genre.save().then(obj => res.status(200).json({
        message:"Genero creado correctamente", 
        obj:obj
    })).catch(ex => res.status(500).json({
        message:"No se pudo almacenar al genero",
        obj:ex
    }));  

}

function list(req, res, next) {
    Genre.find().then(objs => res.status(200).json({
        message: "Lista de generos",
        obj:objs
    })).catch(ex => res.status(500).json({
        message:"No se pudo consultar la lista de generos",
        obj: ex
    }));
  }

function index(req, res, next){
    const id = req.params.id;
    Genre.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Genero con el id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:"No se pudo consultar el Genero",
        obj: ex
    }));
}

function replace(req, res, next){
    const id = req.params.id;
    let description = req.body.description ? req.body.description : "";
    let status = req.body.status ? req.body.status : "";

    let Genre = new Object({
        _description: description,
        _status: status
    });

    Genre.findOneAndUpdate({"_id":id}, Genre, {new: true})
        .then(obj => res.status(200).json({
            msg:"Genero reemplazado correctamente", 
            obj:obj
        })).catch(ex => res.status(500).json({
            msg:"No se pudo reemplazar el Genero",
            obj: ex
        }));
}

function update(req, res, next){
    const id = req.params.id;
    let description = req.body._description;
    let status = req.body._status;

    let Genre = new Object();
    if(description) Genre.__description = description;
    if(status) Genre.__status = status;

    Genre.findOneAndUpdate({"id":id}, Genre)
        .then(obj => res.status(200).json({
            msg:"Genero actualizado correctamente", 
            obj:obj
        })).catch(ex => res.status(500).json({
            msg:"No se pudo actualizar el Genero",
            obj: ex
        }));
}

function destroy(req, res, next){
    const id = req.params.id;

    Genre.findByIdAndRemove({"_id":id}).then(obj => res.status(200).json({
        msg:"Genero eliminado correctamente",
        obj: obj
    })).catch(ex => res.status(500).json({
        msg:"No se pudo eliminar el Genero",
        obj: ex
    }));
}

module.exports = {
    list, index, create, replace, update, destroy
};