module.exports = (sequelize, type) => {
    const Copie = sequelize.define('copie', {
        id: {type: type.INTEGER, primaryKey:true, autoIncrement:true},
        number: type.INTEGER,
        format: type.STRING,
        status: type.STRING
    });
    return Copie
}