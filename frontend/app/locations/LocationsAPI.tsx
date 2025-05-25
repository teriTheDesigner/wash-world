import axios from "axios";
import { Location } from "../locations/location.model";

export class LocationsAPI {
  static baseUrl = "http://127.0.0.1:3000/locations";

  static async getLocations(
    token: string,
    limit?: number,
    offset?: number
  ): Promise<Location[]> {
    const params: Record<string, any> = {};
    if (limit !== undefined) params.limit = limit;
    if (offset !== undefined) params.offset = offset;

    const response = await axios.get<Location[]>(this.baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    });
    return response.data;
  }
}
