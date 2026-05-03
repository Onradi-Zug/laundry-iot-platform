"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MqttService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttService = void 0;
const common_1 = require("@nestjs/common");
const mqtt_1 = require("mqtt");
let MqttService = MqttService_1 = class MqttService {
    constructor() {
        this.logger = new common_1.Logger(MqttService_1.name);
        this.client = null;
    }
    onModuleInit() {
        this.connectClient();
    }
    onModuleDestroy() {
        this.disconnectClient();
    }
    connectClient() {
        const mqttUrl = process.env.MQTT_URL || 'mqtt://broker:1883';
        const options = {
            reconnectPeriod: 1000,
        };
        this.logger.log(`Connecting to MQTT broker: ${mqttUrl}`);
        this.client = (0, mqtt_1.connect)(mqttUrl, options);
        this.client.on('connect', () => {
            this.logger.log('Connected to MQTT broker');
        });
        this.client.on('reconnect', () => {
            this.logger.log('Reconnecting to MQTT broker...');
        });
        this.client.on('error', (err) => {
            this.logger.error('MQTT error: ' + err.message);
        });
        this.client.on('close', () => {
            this.logger.log('MQTT connection closed');
        });
        this.client.on('message', (topic, payload) => {
            try {
                const message = payload.toString();
                this.logger.debug(`MQTT message received on ${topic}: ${message}`);
            }
            catch (err) {
                this.logger.error('Error parsing MQTT message: ' + err.message);
            }
        });
    }
    publish(topic, message, options) {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                return reject(new Error('MQTT client not connected'));
            }
            this.client.publish(topic, message, options ?? {}, (err) => {
                if (err) {
                    this.logger.error(`Publish error on ${topic}: ${err.message}`);
                    return reject(err);
                }
                this.logger.debug(`Published to ${topic}`);
                resolve();
            });
        });
    }
    subscribe(topic, options) {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                return reject(new Error('MQTT client not connected'));
            }
            this.client.subscribe(topic, options ?? {}, (err) => {
                if (err) {
                    this.logger.error(`Subscribe error on ${topic}: ${err.message}`);
                    return reject(err);
                }
                this.logger.log(`Subscribed to ${topic}`);
                resolve();
            });
        });
    }
    unsubscribe(topic) {
        return new Promise((resolve, reject) => {
            if (!this.client) {
                return reject(new Error('MQTT client not connected'));
            }
            this.client.unsubscribe(topic, (err) => {
                if (err) {
                    this.logger.error(`Unsubscribe error on ${topic}: ${err.message}`);
                    return reject(err);
                }
                this.logger.log('Unsubscribed from ' + topic);
                resolve();
            });
        });
    }
    disconnectClient() {
        if (!this.client)
            return;
        try {
            this.client.end(true, () => {
                this.logger.log('MQTT client disconnected');
            });
        }
        catch (err) {
            this.logger.error('Error while disconnecting MQTT client: ' + err.message);
        }
        finally {
            this.client = null;
        }
    }
};
exports.MqttService = MqttService;
exports.MqttService = MqttService = MqttService_1 = __decorate([
    (0, common_1.Injectable)()
], MqttService);
//# sourceMappingURL=mqtt.service.js.map