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
exports.LaundriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const laundry_entity_1 = require("./laundry.entity");
let LaundriesService = class LaundriesService {
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({
            relations: ['building', 'machines']
        });
    }
    findByBuilding(buildingId) {
        return this.repo.find({
            where: { building: { id: buildingId } },
            relations: ['building', 'machines']
        });
    }
    findById(id) {
        return this.repo.findOne({
            where: { id },
            relations: ['building', 'machines']
        });
    }
    create(data) {
        const l = this.repo.create(data);
        return this.repo.save(l);
    }
};
exports.LaundriesService = LaundriesService;
exports.LaundriesService = LaundriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(laundry_entity_1.Laundry)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LaundriesService);
//# sourceMappingURL=laundries.service.js.map