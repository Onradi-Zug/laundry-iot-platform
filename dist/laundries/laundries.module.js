"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaundriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const laundry_entity_1 = require("./laundry.entity");
const laundries_service_1 = require("./laundries.service");
const laundries_controller_1 = require("./laundries.controller");
let LaundriesModule = class LaundriesModule {
};
exports.LaundriesModule = LaundriesModule;
exports.LaundriesModule = LaundriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([laundry_entity_1.Laundry])],
        providers: [laundries_service_1.LaundriesService],
        controllers: [laundries_controller_1.LaundriesController],
        exports: [laundries_service_1.LaundriesService]
    })
], LaundriesModule);
//# sourceMappingURL=laundries.module.js.map