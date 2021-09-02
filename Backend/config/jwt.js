require("dotenv").config({path:__dirname+'/./../.env'});
let config = {
    JWT_SECRET: process.env.JWT
};

module.exports = config;