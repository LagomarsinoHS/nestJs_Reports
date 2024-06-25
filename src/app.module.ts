import { Module } from '@nestjs/common';
import { ReportsModule } from './reports/reports.module';
import { ConfigModule } from '@nestjs/config';
import { PrinterModule } from './printer/printer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReportsModule,
    PrinterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
