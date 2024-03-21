import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  onModuleInit() {
    this.$connect()
      .then(() => {
        this.logger.log('Connected to DB');
      })
      .catch((err) => this.logger.debug(err));
  }
}
