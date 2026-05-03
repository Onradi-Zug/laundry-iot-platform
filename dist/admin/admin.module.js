"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const tenants_module_1 = require("../tenants/tenants.module");
const users_module_1 = require("../users/users.module");
const buildings_module_1 = require("../buildings/buildings.module");
const apartments_module_1 = require("../apartments/apartments.module");
const laundries_module_1 = require("../laundries/laundries.module");
const machines_module_1 = require("../machines/machines.module");
const billing_module_1 = require("../billing/billing.module");
const rules_module_1 = require("../rules/rules.module");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            tenants_module_1.TenantsModule,
            users_module_1.UsersModule,
            buildings_module_1.BuildingsModule,
            apartments_module_1.ApartmentsModule,
            laundries_module_1.LaundriesModule,
            machines_module_1.MachinesModule,
            billing_module_1.BillingModule,
            rules_module_1.RulesModule
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService]
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map