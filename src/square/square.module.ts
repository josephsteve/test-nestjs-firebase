import { Module } from '@nestjs/common';
import { SquareController } from './square.controller';
import { SquareService } from './square.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [SquareController],
  providers: [SquareService],
})
export class SquareModule {}
