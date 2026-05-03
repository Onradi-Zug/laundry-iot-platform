"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryService = void 0;
const common_1 = require("@nestjs/common");
const machines_service_1 = require("../machines/machines.service");
const bookings_service_1 = require("../bookings/bookings.service");
const events_service_1 = require("../events/events.service");
let RecoveryService = class RecoveryService {
    constructor(machines, bookings, events) {
        this.machines = machines;
        this.bookings = bookings;
        this.events = events;
    }
    async checkStuckMachines() {
        const stuck = await this.machines.findStuckMachines(300);
        for (const machine of stuck) {
            await this.machines.updateStatus(machine.id, 'error');
            await this.events.create({
                machine,
                type: 'error',
                payload: { reason: 'Machine stuck (no status updates)' }
            });
        }
    }
    async finishExpiredBookings() {
        const expired = await this.bookings.findExpired();
        for (const booking of expired) {
            await this.bookings.finish(booking.id);
            await this.events.create({
                machine: booking.machine,
                type: 'finish',
                payload: { reason: 'Booking expired automatically' }
            });
        }
    }
    async runFullRecovery() {
        await this.checkStuckMachines();
        await this.finishExpiredBookings();
    }
};
exports.RecoveryService = RecoveryService;
exports.RecoveryService = RecoveryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [machines_service_1.MachinesService,
        bookings_service_1.BookingsService,
        events_service_1.EventsService])
], RecoveryService);
//# sourceMappingURL=recovery.service.js.map