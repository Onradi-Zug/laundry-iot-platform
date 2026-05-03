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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const tenants_service_1 = require("../tenants/tenants.service");
const users_service_1 = require("../users/users.service");
const buildings_service_1 = require("../buildings/buildings.service");
const apartments_service_1 = require("../apartments/apartments.service");
const laundries_service_1 = require("../laundries/laundries.service");
const machines_service_1 = require("../machines/machines.service");
const billing_service_1 = require("../billing/billing.service");
const rules_service_1 = require("../rules/rules.service");
let AdminService = class AdminService {
    constructor(tenants, users, buildings, apartments, laundries, machines, billing, rules) {
        this.tenants = tenants;
        this.users = users;
        this.buildings = buildings;
        this.apartments = apartments;
        this.laundries = laundries;
        this.machines = machines;
        this.billing = billing;
        this.rules = rules;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tenants_service_1.TenantsService,
        users_service_1.UsersService,
        buildings_service_1.BuildingsService,
        apartments_service_1.ApartmentsService,
        laundries_service_1.LaundriesService,
        machines_service_1.MachinesService,
        billing_service_1.BillingService,
        rules_service_1.RulesService])
], AdminService);
//# sourceMappingURL=admin.service.js.map