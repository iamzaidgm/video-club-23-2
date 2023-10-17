const express = require('express');
const{ Booking }= require('../db');

function create(req, res, next){
    const date = req.body.date;

    Booking.create({
        date:date
    }).then(object => res.json(object))
      .catch(err => res.send(err));
}

function list(req, res, next) {
    Booking.findAll()
         .then(objects => res.json(objects))
         .catch(err => res.send(err));
  }

function index(req, res, next){
    const id = req.params.id;
    Booking.findByPk(id)
         .then(object => res.json(object))
         .catch(err => res.send(err));
}

function replace(req, res, next){
    const id = req.params.id;
    Booking.findByPk(id)
        .then(object => {
            const status = req.body.status ? req.body.status : "";
            object.update({
                status: status
            }).then(obj => res.json(obj))
              .catch(err => res.json(err));
        }).catch(err => res.json(err));
}

function update(req, res, next){
    const id = req.params.id;
    Booking.findByPk(id)
        .then(object => {
            const status = req.body.status ? req.body.status : object.status;
        object.update({
            status: status
        }).then(obj => res.json(obj))
          .catch(err => res.json(err));
    }).catch(err => res.send(err));
}

function destroy(req, res, next){
    const id = req.params.id;
    Booking.destroy({where:{id:id}})
         .then(obj => res.json(obj))
         .catch(err => res.send(err));
}

module.exports = {
    list, index, create, replace, update, destroy
};