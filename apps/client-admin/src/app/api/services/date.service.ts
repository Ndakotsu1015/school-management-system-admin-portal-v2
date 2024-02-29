import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class DateService {
  getWeeStart(date: Date) {
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday

    const weekStartDate = new Date(date.getFullYear(), date.getMonth(), diff);

    return weekStartDate.toISOString();
  }

  getMonthStart(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const monthStartDate = new Date(year, month, 1);
    return monthStartDate.toISOString();
  }

  getYearStartDate(date: Date): string {
    const year = date.getFullYear();

    const yearStartDate = new Date(year, 0, 1); // Set month to 0 (January) and day to 1
    return yearStartDate.toISOString();
  }

  compareDates(date1: Date, date2: Date): number {
    const timestamp1 = date1.getTime();
    const timestamp2 = date2.getTime();

    if (timestamp1 < timestamp2) {
      return -1; // date1 is earlier
    } else if (timestamp1 > timestamp2) {
      return 1; // date1 is later
    } else {
      return 0; // dates are equal
    }
  }

  compareDateRange(date1: Date, date2: Date, date3: Date): number {
    const timestamp1 = date1.getTime();
    const timestamp2 = date2.getTime();
    const timestamp3 = date3.getTime();
    console.log(timestamp1 >= timestamp2 && timestamp1 <= timestamp3);


    if (timestamp1 >= timestamp2 && timestamp1 <= timestamp3) {
      return 1; // date1 is earlier
    } else {
      return 0; // dates are equal
    }
  }

  convertDate(date: any) {
    const datePipe = new DatePipe('en-US');
    const formattedDate = datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.SSSZ');
    return formattedDate;

  }
}
