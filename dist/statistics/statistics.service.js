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
exports.StatisticsService = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("../events/events.service");
const machines_service_1 = require("../machines/machines.service");
let StatisticsService = class StatisticsService {
    constructor(events, machines) {
        this.events = events;
        this.machines = machines;
    }
    async machineUsage(machineId) {
        const events = await this.events.findByMachine(machineId);
        const starts = events.filter((e) => e.type === 'start').length;
        const finishes = events.filter((e) => e.type === 'finish').length;
        const errors = events.filter((e) => e.type === 'error').length;
        return {
            machineId,
            starts,
            finishes,
            errors
        };
    }
    async tenantOverview(tenantId) {
        const machines = await this.machines.findByLaundry(null);
        const total = machines.length;
        const running = machines.filter((m) => m.status === 'running').length;
        const idle = machines.filter((m) => m.status === 'idle').length;
        const error = machines.filter((m) => m.status === 'error').length;
        return {
            total,
            running,
            idle,
            error
        };
    }
    async recentErrors(limit = 20) {
        return this.events.findErrors(limit);
    }
};
exports.StatisticsService = StatisticsService;
exports.StatisticsService = StatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        machines_service_1.MachinesService])
], StatisticsService);
//# sourceMappingURL=statistics.service.js.map