import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  getStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  }

  getReady() {
    return {
      ready: true,
      timestamp: new Date().toISOString()
    };
  }
}
