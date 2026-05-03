import { Injectable, Logger, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connect, MqttClient, IClientOptions } from 'mqtt';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MqttService.name);
  private client: MqttClient | null = null;

  onModuleInit() {
    this.connectClient();
  }

  onModuleDestroy() {
    this.disconnectClient();
  }

  private connectClient(): void {
    const mqttUrl = process.env.MQTT_URL || 'mqtt://broker:1883';

    const options: IClientOptions = {
      reconnectPeriod: 1000,
    };

    this.logger.log(`Connecting to MQTT broker: ${mqttUrl}`);
    this.client = connect(mqttUrl, options);

    this.client.on('connect', () => {
      this.logger.log('Connected to MQTT broker');
    });

    this.client.on('reconnect', () => {
      this.logger.log('Reconnecting to MQTT broker...');
    });

    this.client.on('error', (err: Error) => {
      this.logger.error('MQTT error: ' + err.message);
    });

    this.client.on('close', () => {
      this.logger.log('MQTT connection closed');
    });

    this.client.on('message', (topic: string, payload: Buffer) => {
      try {
        const message = payload.toString();
        this.logger.debug(`MQTT message received on ${topic}: ${message}`);
        // Обробка повідомлення тут
      } catch (err) {
        this.logger.error('Error parsing MQTT message: ' + (err as Error).message);
      }
    });
  }

  publish(topic: string, message: string | Buffer, options?: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        return reject(new Error('MQTT client not connected'));
      }
      this.client.publish(topic, message, options ?? {}, (err?: Error) => {
        if (err) {
          this.logger.error(`Publish error on ${topic}: ${err.message}`);
          return reject(err);
        }
        this.logger.debug(`Published to ${topic}`);
        resolve();
      });
    });
  }

  subscribe(topic: string, options?: any): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        return reject(new Error('MQTT client not connected'));
      }
      this.client.subscribe(topic, options ?? {}, (err: Error | null) => {
        if (err) {
          this.logger.error(`Subscribe error on ${topic}: ${err.message}`);
          return reject(err);
        }
        this.logger.log(`Subscribed to ${topic}`);
        resolve();
      });
    });
  }

  unsubscribe(topic: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.client) {
        return reject(new Error('MQTT client not connected'));
      }
      this.client.unsubscribe(topic, (err?: Error) => {
        if (err) {
          this.logger.error(`Unsubscribe error on ${topic}: ${err.message}`);
          return reject(err);
        }
        this.logger.log('Unsubscribed from ' + topic);
        resolve();
      });
    });
  }

  private disconnectClient(): void {
    if (!this.client) return;
    try {
      this.client.end(true, () => {
        this.logger.log('MQTT client disconnected');
      });
    } catch (err) {
      this.logger.error('Error while disconnecting MQTT client: ' + (err as Error).message);
    } finally {
      this.client = null;
    }
  }
}
