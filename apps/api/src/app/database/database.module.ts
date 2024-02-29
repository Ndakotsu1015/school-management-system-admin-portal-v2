import { Global, Module } from '@nestjs/common';
import { DatabaseFactoryService } from './database-factory.service';
// import { SourceOfFinanceSeeder } from './seeders/source-of-finance.seeder';

@Global()
@Module({
  providers: [
    // SourceOfFinanceSeeder,
    // - seeders should be above
    DatabaseFactoryService,
    // - repository providers
  ],
  exports: [],
})
export class DatabaseModule { }
