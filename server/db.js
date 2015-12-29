import settings from './Settings';
import mongodb from 'mongodb';
var Db = mongodb.Db;
var Connection = mongodb.Connection;
var Server = mongodb.Server;
module.exports = new Db(settings.db ,new Server(settings.host, Connection.DEFAULT_PORT, {}));