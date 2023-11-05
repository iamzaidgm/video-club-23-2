const express = require('express');
const Director = require('../models/director');
const Movie = require('../models/movie');
const Genre = require('../models/genre');
const Actor = require('../models/actor');

async function create(req, res, next) {
    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;
    const castIds = req.body.castIds;

    let genre = Genre.findOne({ "_id" : genreId });

    let director = await Director.findOne({ "_id" : directorId });

    let cast = [];

    for (let i = 0; i < castIds.length; i++) {
        let actor = Actor.findOne({ "_id" : castIds[i] });

        cast.push(actor);
    }

    let movie = new Movie({
        title: title,
        genre: genre,
        director: director,
        cast: cast
    });

    movie.save()
         .then(object => res.status(200).json({
            message: "Pelicula creada y guardada",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "La pelicula no se pudo crear, ni guardar",
            obj: ex
         }));
}

function list(req, res, next) {
    const page = req.params.page ? req.params.page : 1;

    const options = {
        page: page,
        limit: 5
    }

    Movie.paginate({}, options)
         .then(objects => res.status(200).json({
            message: "Lista de peliculas",
            obj: objects
         })).catch(ex => res.status(500).json({
            message: "la lista de peliculas nos se puede mostrar",
            obj: ex
         }));
}

function index(req, res, next) {
    const id = req.params.id;

    Movie.findOne({ "_id" : id })
        then(object => res.status(200).json({
            message: `Pelicula con el id ${id}`,
            obj: object
        })).catch(ex => res.status(500).json({
            message: `No hay información de la pelicula con el id ${id}`,
            obj: ex
        }));
}

function replace(req, res, next) {
    const id = req.params.id;

    const title = req.body.title ? req.body.title : "";
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    let director;
    let genre;

    if (directorId) {
        director = Director.findOne({ "_id" : directorId });
    } else {
        director = "";
    }

    if (genreId) {
        genre = Genre.findOne({ "_id" : genreId });
    }

    let movie = new Movie({
        _title: title,
        _genre: genre,
        _director: director
    });

    Movie.findOneAndUpdate({ "_id" : id }, movie, { new : true })
         .then(object => res.status(200).json({
            message: "Pelicula remplazada correctamente",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "La pelicula no se pudo remplazar",
            obj: ex
         }));
}

function update(req, res, next) {
    const id = req.params.id;

    const title = req.body.title;
    const genreId = req.body.genreId;
    const directorId = req.body.directorId;

    let director, genre;
    let movie = new Object();

    if (title) movie._title = title;
    if (genreId) {
        genre = Genre.findOne({ "_id" : genreId });

        movie._genre = genre;
    }
    if (directorId) {
        director = Director.findOne({ "_id" : directorId });

        movie._director = director;
    }

    Movie.findOneAndUpdate({ "_id" : id }, movie)
         .then(object => res.status(200).json({
            message: "Pelicula actualizada",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "La pelicula no se pudo actualizar",
            obj: ex
         }));
}

function destroy(req, res, next) {
    const id = req.params.id;

    Movie.findOneAndRemove({ "_id" : id })
         .then(object => res.status(200).json({
            message: "pelicula eliminada",
            obj: object
         })).catch(ex => res.status(500).json({
            message: "La pelicula no se pudo eliminar"
         }));
}

module.exports = {
    create, list, index, replace, update, destroy
};
