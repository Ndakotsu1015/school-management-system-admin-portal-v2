// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../../prisma/prisma.service';

// @Injectable()
// export class SourceOfFinanceSeeder implements AbstractSeeder {
//   constructor(private readonly prisma: PrismaService) {}

//   async run(): Promise<void> {
//     await this._loadData();
//   }

//   private async _loadData() {
//     const sourceOfFinanceExists = await this.prisma.sourceOfFinance.count();
//     if (sourceOfFinanceExists > 0) {
//       return;
//     }

//     await this.prisma.sourceOfFinance.createMany({
//       data: [
//         { name: 'Earmarked Revenue' },
//         { name: 'Revenue Generation' },
//         { name: 'Special Project Funds' },
//         { name: 'Special Revenue Accounts' },
//         { name: 'Public-Private Partnerships', required_extra_attribute: true },
//       ],
//     });

//     await this.prisma.sourceOfFinance.create({
//       data: {
//         name: 'Loans',
//         required_extra_attribute: true,
//         sourceOfFinanceOption: {
//           createMany: {
//             data: [
//               { label: 'Individual lending' },
//               { label: 'Organisation lending' },
//             ],
//           },
//         },
//       },
//     });

//     await this.prisma.sourceOfFinance.create({
//       data: {
//         name: 'Donor Grants and Aid',
//         required_extra_attribute: true,
//         sourceOfFinanceOption: {
//           createMany: {
//             data: [
//               { label: 'Donating organisation' },
//               { label: 'Donating individual ' },
//             ],
//           },
//         },
//       },
//     });
//   }
// }
