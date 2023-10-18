const Sequelize = require('sequelize');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');
const movieActorModel = require('./models/movieActor');
const bookingModel = require('./models/booking');
const copieModel = require('./models/copie');
const userModel = require('./models/user');

/* 
    1) Nombre de la base de datos
    2) Usuario 
    3) Contraseña
    4) Objeto de configuración ORM
*/

const sequelize = new Sequelize('railway', 'root', 'J0PgXdbMH379LYdfkLqN', {
    host: 'containers-us-west-92.railway.app',
    port: 6436,
    dialect: 'mysql'
});

const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);
const Copie = copieModel(sequelize, Sequelize);
const User = userModel(sequelize, Sequelize);

//Un genero puede tener muchas peliculas
Genre.hasMany(Movie, {as:'movies'});

//Una pelicula tiene un genero
Movie.belongsTo(Genre, {as:'genre'});

//Un director puede tener muchas peliculas
Director.hasMany(Movie, {as:'movies'});

//Una pelicula puede tener un director
Movie.belongsTo(Director, {as:'director'});

//Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreignKey:'movieId'});

//En una pelicula participan muchos actores
MovieActor.belongsTo(Actor, {foreignKey:'actorId'});

//una pelicula tiene muchas copias
Movie.hasMany(Copie, {as:'copies'});

//una copia solo puede tiene una pelicula
Copie.belongsTo(Movie, {as: 'movie'});

//un miembro puede tener varios bookings
Member.hasMany(Booking, {as: 'bookings'});

//un booking solo tiene un miembro
Booking.belongsTo(Member, {as:'member'});

//un booking solo tiene una copia
Booking.belongsTo(Copie, {as: 'copie'});

//una copia tiene varios bookings
Copie.hasMany(Booking, {as: 'bookings'})


Movie.belongsToMany(Actor, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'movies_actors'
});

Actor.belongsToMany(Movie, {
    foreignKey: 'actorId',
    as: 'actors',
    through: 'movies_actors'
});

sequelize.sync({
    force:true
}).then(()=>{
    console.log('Base de datos sincronizada. ');
});

module.exports = {Director, Genre, Movie, Actor, Member, Booking, Copie, User};
