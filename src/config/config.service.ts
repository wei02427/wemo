import { Injectable } from "@nestjs/common";
import { ConfigService as NestjsConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
    constructor(
        private readonly nestjsConfigService: NestjsConfigService
    ) { }

    getDBServer() {
        return this.nestjsConfigService.getOrThrow('DB_SERVER');
    }

    getDBUser() {
        return this.nestjsConfigService.getOrThrow('DB_USER');
    }

    getDBPassword() {
        return this.nestjsConfigService.getOrThrow('DB_PASSWORD');
    }

    getAuthPublicKey() {
        return this.nestjsConfigService.getOrThrow('AUTH_PUBLIC_KEY');
    }

    getAuthPrivateKey() {
        return this.nestjsConfigService.getOrThrow('AUTH_PRIVATE_KEY');
    }
}