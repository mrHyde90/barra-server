"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ticket_1 = __importDefault(require("./ticket"));
var TicketLista = /** @class */ (function () {
    function TicketLista() {
        this.tickets = [];
    }
    TicketLista.prototype.getTickets = function () {
        return this.tickets.slice();
    };
    TicketLista.prototype.addTicket = function (id, sala) {
        var newTicket = new ticket_1.default(id, sala);
        this.tickets.push(newTicket);
    };
    TicketLista.prototype.deleteTicket = function (id) {
        this.tickets = this.tickets.filter(function (ticket) { return ticket.id !== id; });
    };
    TicketLista.prototype.getSalas = function (sala) {
        return this.tickets.filter(function (ticket) { return ticket.sala === sala; });
    };
    TicketLista.prototype.nextSala = function (sala) {
        var ticketSala = this.getSalas(sala);
        if (!Array.isArray(ticketSala) || !ticketSala.length) {
            // array does not exist, is not an array, or is empty
            return new ticket_1.default(0, "");
        }
        return ticketSala[0];
    };
    TicketLista.prototype.nextSalas = function () {
        var sala1 = this.nextSala("sala-1");
        var sala2 = this.nextSala("sala-2");
        var sala3 = this.nextSala("sala-3");
        var sala4 = this.nextSala("sala-4");
        var allSalas = {
            sala1: sala1,
            sala2: sala2,
            sala3: sala3,
            sala4: sala4
        };
        return allSalas;
    };
    return TicketLista;
}());
exports.default = TicketLista;
