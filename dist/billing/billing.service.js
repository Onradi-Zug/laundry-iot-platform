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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tariff_entity_1 = require("./tariff.entity");
const transaction_entity_1 = require("./transaction.entity");
let BillingService = class BillingService {
    constructor(tariffs, transactions) {
        this.tariffs = tariffs;
        this.transactions = transactions;
    }
    async getActiveTariff(tenantId) {
        return this.tariffs.findOne({
            where: { tenant: { id: tenantId }, active: true }
        });
    }
    async calculatePrice(booking, tariff) {
        if (tariff.pricePerCycle)
            return tariff.pricePerCycle;
        const minutes = (booking.endTime.getTime() - booking.startTime.getTime()) / 60000;
        return Math.ceil(minutes * tariff.pricePerMinute);
    }
    async createTransaction(data) {
        const t = this.transactions.create(data);
        return this.transactions.save(t);
    }
    async markPaid(id) {
        return this.transactions.update(id, { status: 'paid' });
    }
    async markFailed(id) {
        return this.transactions.update(id, { status: 'failed' });
    }
};
exports.BillingService = BillingService;
exports.BillingService = BillingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tariff_entity_1.Tariff)),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BillingService);
//# sourceMappingURL=billing.service.js.map