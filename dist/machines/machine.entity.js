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
exports.Machine = void 0;
const typeorm_1 = require("typeorm");
const laundry_entity_1 = require("../laundries/laundry.entity");
const tenant_entity_1 = require("../tenants/tenant.entity");
const event_entity_1 = require("../events/event.entity");
const booking_entity_1 = require("../bookings/booking.entity");
let Machine = class Machine {
};
exports.Machine = Machine;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Machine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Machine.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'idle' }),
    __metadata("design:type", String)
], Machine.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Machine.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Machine.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => laundry_entity_1.Laundry, (l) => l.machines),
    __metadata("design:type", laundry_entity_1.Laundry)
], Machine.prototype, "laundry", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tenant_entity_1.Tenant, (t) => t.buildings),
    __metadata("design:type", tenant_entity_1.Tenant)
], Machine.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_entity_1.Event, (e) => e.machine),
    __metadata("design:type", Array)
], Machine.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => booking_entity_1.Booking, (b) => b.machine),
    __metadata("design:type", Array)
], Machine.prototype, "bookings", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'now()' }),
    __metadata("design:type", Date)
], Machine.prototype, "updatedAt", void 0);
exports.Machine = Machine = __decorate([
    (0, typeorm_1.Entity)('machines')
], Machine);
//# sourceMappingURL=machine.entity.js.map