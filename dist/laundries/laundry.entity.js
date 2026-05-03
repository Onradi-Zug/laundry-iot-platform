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
exports.Laundry = void 0;
const typeorm_1 = require("typeorm");
const building_entity_1 = require("../buildings/building.entity");
const machine_entity_1 = require("../machines/machine.entity");
let Laundry = class Laundry {
};
exports.Laundry = Laundry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Laundry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Laundry.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => building_entity_1.Building, (b) => b.laundries),
    __metadata("design:type", building_entity_1.Building)
], Laundry.prototype, "building", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => machine_entity_1.Machine, (m) => m.laundry),
    __metadata("design:type", Array)
], Laundry.prototype, "machines", void 0);
exports.Laundry = Laundry = __decorate([
    (0, typeorm_1.Entity)('laundries')
], Laundry);
//# sourceMappingURL=laundry.entity.js.map