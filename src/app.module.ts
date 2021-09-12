import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SquareModule } from './square/square.module';

@Module({
  imports: [SquareModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
