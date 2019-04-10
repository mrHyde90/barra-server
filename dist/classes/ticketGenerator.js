"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TicketGenerator = /** @class */ (function () {
    function TicketGenerator() {
        this.counter = 1;
    }
    Object.defineProperty(TicketGenerator, "instance", {
        get: function () {
            //regresa la instancia, si no se encuentra entonces el instance agarra la clase
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    TicketGenerator.prototype.generarTicket = function () {
        var ticketNuevo = {
            id: this.counter,
            sala: "sala-" + (this.counter % 4 + 1)
        };
        this.incrementarCounter();
        return ticketNuevo;
    };
    TicketGenerator.prototype.getContador = function () {
        return this.counter;
    };
    TicketGenerator.prototype.incrementarCounter = function () {
        this.counter++;
    };
    TicketGenerator.prototype.reiniciarContador = function () {
        this.counter = 1;
    };
    return TicketGenerator;
}());
exports.default = TicketGenerator;
