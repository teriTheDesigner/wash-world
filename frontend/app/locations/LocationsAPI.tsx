import axios from "axios";
import { Location } from "../locations/location.model";

export class LocationsAPI {
  static baseUrl = "http://127.0.0.1:3000/locations";

  static async getLocations(token: string): Promise<Location[]> {
    const response = await axios.get<Location[]>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
