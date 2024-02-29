import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    logInfo(log: unknown) {
        console.log(log);
    }
}