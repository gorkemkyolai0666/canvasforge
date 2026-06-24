import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  check() {
    return {
      status: 'ok',
      service: 'canvasforge-api',
      timestamp: new Date().toISOString(),
    };
  }
}
