import { Injectable } from "@nestjs/common";
import { environment } from "apps/api/src/environments/environment";

@Injectable()
export class ImageUtilService {
  baseUrl = `${environment.apiUrl}/uploads/files/`;
  getImageUrl(filename: string) {
    const imageUrl = this.baseUrl + filename;
    return imageUrl
  }
}
