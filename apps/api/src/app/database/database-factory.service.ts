import { Injectable } from '@nestjs/common';
// import { AppropriationPlanSeeder } from './seeders/approriation-plan.seeder';
// import { BudgetingSeeder } from './seeders/budgeting.seeder';
// import { BureauSeeder } from './seeders/bureau.seeder';
// import { GeoLocationSeeder } from './seeders/geo-location.seeder';
// import { MdaTypeSeeder } from './seeders/mda-type.seeder';
// import { MdaSeeder } from './seeders/mda.seeder';
// import { ProcurementsSeeder } from './seeders/procurement-items.seeder';
// import { ProcurementOptionsSeeder } from './seeders/procurement-options.seeder';
// import { ProcurementPlanSeeder } from './seeders/procurement-plan.seeder';
// import { VendorCAOCSeeder } from './seeders/vendor-caoc.seeder';
// import { VendorOnboardDocumentSeeder } from './seeders/vendor-onboard-document.seeder';
// import { VendorOnboardSeeder } from './seeders/vendor-onboard.seeder';
// import { VendorOrganisationTypeSeeder } from './seeders/vendor-organisation-type.seeder';
// import { VendorSeeder } from './seeders/vendor.seeder';
// import { TenantUserPermissionSeeder } from './seeders/tenant-user-permission.seeder';
// import { SourceOfFinanceSeeder } from './seeders/source-of-finance.seeder';
// import { CurrencySeeder } from './seeders/currency.seeder';

@Injectable()
export class DatabaseFactoryService {
  private seeders: AbstractSeeder[] = [];

  constructor(
    // private readonly tenantUserPermissionSeeder: TenantUserPermissionSeeder,
    // private readonly budgetingSeeder: BudgetingSeeder,
    // private readonly bureauSeeder: BureauSeeder,
    // private readonly currencySeeder: CurrencySeeder,
    // private readonly geoLocationSeeder: GeoLocationSeeder,
    // private readonly mdaTypeSeeder: MdaTypeSeeder,
    // private readonly vendorCAOCSeeder: VendorCAOCSeeder,
    // private readonly vendorOrganisationTypeSeeder: VendorOrganisationTypeSeeder,
    // private readonly mdaSeeder: MdaSeeder,
    // private readonly vendorOnboardDocumentSeeder: VendorOnboardDocumentSeeder,
    // private readonly vendorOnboardSeeder: VendorOnboardSeeder,
    // private readonly vendorSeeder: VendorSeeder,
    // private readonly procurementOptionsSeeder: ProcurementOptionsSeeder,
    // private readonly appropriationSeeder: AppropriationPlanSeeder,
    // private readonly procurementPlanSeeder: ProcurementPlanSeeder,
    // private readonly procurementsSeeder: ProcurementsSeeder,
    // private readonly sorceOfFinanceSeeder: SourceOfFinanceSeeder
  ) {
    this._registerSeeders();
    this._runSeeders();
  }

  private _registerSeeders() {
    const seeders: AbstractSeeder[] = [
      // this.currencySeeder,
      // this.geoLocationSeeder,
      // this.vendorCAOCSeeder,
      // this.vendorOrganisationTypeSeeder,
      // this.vendorOnboardDocumentSeeder,
      // this.tenantUserPermissionSeeder,
      // this.mdaTypeSeeder,
      // this.budgetingSeeder,
      // this.bureauSeeder,
      // this.mdaSeeder,
      // this.vendorOnboardSeeder,
      // this.vendorSeeder,
      // this.procurementOptionsSeeder,
      // this.appropriationSeeder,
      // this.procurementPlanSeeder,
      // this.procurementsSeeder,
      // this.sorceOfFinanceSeeder,
    ];
    this.seeders.push(...seeders);
  }

  private async _runSeeders() {
    this.seeders.map(async (seeder) => {
      await seeder.run();
    });
  }
}
