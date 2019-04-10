"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var ticketLista_1 = __importDefault(require("../classes/ticketLista"));
var ticketGenerator_1 = __importDefault(require("../classes/ticketGenerator"));
// Creating the list and fill it
exports.ticketList = new ticketLista_1.default();
var dummyData = [
    { id: 99, sala: "sala-1" },
    { id: 100, sala: "sala-2" },
    { id: 101, sala: "sala-3" },
    { id: 102, sala: "sala-4" }
];
(_a = exports.ticketList.tickets).push.apply(_a, dummyData);
var generador = ticketGenerator_1.default.instance;
exports.apartarMesa = function (cliente, io) {
    cliente.on("apartar-mesa", function (payload) {
        console.log("Apartando mesa");
        var qrGen = payload.nombre + " Pasar a pagar al siguiente enlace: " + "https://www.paypal.com/us/home";
        var consumidor = { nombre: payload.nombre, mesa: payload.mesa, qrcode: qrGen };
        console.log(consumidor);
        // Emitimos nuestro nuevo ticket para que sea escuchado
        io.emit("nuevo-aparte", consumidor);
    });
};
exports.obtener_tickets = function (cliente, io) {
    cliente.on("obtener-tickets", function () {
        console.log("Obteniendo todos los tickets");
        //Se lo emite a todos
        //Se lo emite solo al cleinte, unicamente a la persona que se esta conectando
        io.to(cliente.id).emit('tickets-activos', exports.ticketList.getTickets());
    });
};
exports.obtener_ticket_sala = function (cliente, io) {
    cliente.on("obtener-ticket", function (payload) {
        var ticketSala = exports.ticketList.nextSala(payload.sala);
        console.log(payload.sala);
        io.to(cliente.id).emit("ticket-sala", ticketSala);
    });
};
exports.guardarTicket = function (cliente, io) {
    cliente.on("guardar-ticket", function () {
        console.log("Guardando ticket");
        //Se genera el nuevo ticket
        var nuevoTicket = generador.generarTicket();
        // agregamos nuestro nuevo ticket
        exports.ticketList.addTicket(nuevoTicket.id, nuevoTicket.sala);
        // Emitimos nuestro nuevo ticket para que sea escuchado
        io.emit("ticket-nuevo", nuevoTicket);
    });
};
exports.nextTicket = function (cliente, io) {
    cliente.on("next-ticket", function (payload) {
        exports.ticketList.deleteTicket(payload.id);
        var ticketSala = exports.ticketList.nextSala(payload.sala);
        io.emit("ticket-sala", ticketSala);
    });
};
exports.nextSalas = function (cliente, io) {
    cliente.on("next-salas", function () {
        var salas = exports.ticketList.nextSalas();
        io.emit("listen-salas", salas);
    });
};
