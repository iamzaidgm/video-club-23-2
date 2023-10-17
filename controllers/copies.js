const express = require('express');
const{ Copie }= require('../db');

function create(req, res, next){
    const number = req.body.number;
    const format = req.body.format;
    const status = req.body.status;

    Copie.create({
        number: number,
        format: format,
        status: status
    }).then(object => res.json(object))
      .catch(err => res.send(err));
}

function list(req, res, next) {
    Copie.findAll()
         .then(objects => res.json(objects))
         .catch(err => res.send(err));
  }

function index(req, res, next){
    const id = req.params.id;
    Copie.findByPk(id)
         .then(object => res.json(object))
         .catch(err => res.send(err));
}

function replace(req, res, next){
    const id = req.params.id;
    Copie.findByPk(id)
        .then(object => {
            const number = req.body.number ? req.body.number : "";
            const format = req.body.format ? req.body.format : "";
            const status = req.body.status ? req.body.status: "";
            object.update({
                number:number,
                format:format,
                status: status
            }).then(obj => res.json(obj))
              .catch(err => res.json(err));
        }).catch(err => res.json(err));
}

function update(req, res, next){
    const id = req.params.id;
    Copie.findByPk(id)
        .then(object => {
            const number = req.body.number ? req.body.number : object.number;
            const format = req.body.format ? req.body.format : object.format;
            const status = req.body.status ? req.body.status : object.status;
        object.update({
            number:number,
            format:format,
            status: status
        }).then(obj => res.json(obj))
          .catch(err => res.json(err));
    }).catch(err => res.send(err));
}

function destroy(req, res, next){
    const id = req.params.id;
    Copie.destroy({where:{id:id}})
         .then(obj => res.json(obj))
         .catch(err => res.send(err));
}

module.exports = {
    list, index, create, replace, update, destroy
};