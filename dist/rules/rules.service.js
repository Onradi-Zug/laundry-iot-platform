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
exports.RulesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rule_entity_1 = require("./rule.entity");
let RulesService = class RulesService {
    constructor(ruleRepository) {
        this.ruleRepository = ruleRepository;
    }
    async create(data) {
        try {
            const entity = this.ruleRepository.create ? this.ruleRepository.create(data) : data;
            return this.ruleRepository.save ? await this.ruleRepository.save(entity) : { ok: true, data };
        }
        catch (err) {
            return { ok: false, error: err.message };
        }
    }
    async findOne(id) {
        if (this.ruleRepository.findOne) {
            return this.ruleRepository.findOne({ where: { id } });
        }
        return { id, message: 'not implemented' };
    }
    async findAll() {
        if (this.ruleRepository.find) {
            return this.ruleRepository.find();
        }
        return [];
    }
};
exports.RulesService = RulesService;
exports.RulesService = RulesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rule_entity_1.Rule)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RulesService);
//# sourceMappingURL=rules.service.js.map