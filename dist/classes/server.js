"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var environment_1 = require("../global/environment");
var socket_io_1 = __importDefault(require("socket.io"));
var socket = __importStar(require("../sockets/socket"));
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    Server.prototype.escucharSockets = function () {
        var _this = this;
        this.io.on("connection", function (cliente) {
            console.log("Escuchando sockets");
            socket.apartarMesa(cliente, _this.io);
            //Obteniendo todos los tickets
            socket.obtener_tickets(cliente, _this.io);
            // Socket addTicket
            socket.guardarTicket(cliente, _this.io);
            //Obteniendo el siguietne ticket
            socket.obtener_ticket_sala(cliente, _this.io);
            // siguiente ticket
            socket.nextTicket(cliente, _this.io);
            // Escuchando todas las salas
            socket.nextSalas(cliente, _this.io);
        });
    };
    Object.defineProperty(Server, "instance", {
        get: function () {
            //regresa la instancia, si no se encuentra entonces el instance agarra la clase
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Server.prototype.start = function (callback) {
        this.httpServer.listen(this.port, function () { console.log("La aplicacion esta lista"); });
    };
    return Server;
}());
exports.default = Server;
