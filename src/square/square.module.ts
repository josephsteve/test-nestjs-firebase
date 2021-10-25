import { Module } from '@nestjs/common';
import { SquareController } from './square.controller';
import { SquareService } from './square.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [SquareController],
  providers: [SquareService],
})
export class SquareModule {}
