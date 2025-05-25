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

  static async getLocationById(id: string, token: string): Promise<Location> {
    const response = await axios.get<Location>(`${this.baseUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  static async getAdminStats(token: string): Promise<{
    totalLocations: number;
    totalServiceUnits: number;
    serviceUnitTypes: Record<string, number>;
  }> {
    const response = await axios.get<{
      totalLocations: number;
      totalServiceUnits: number;
      serviceUnitTypes: Record<string, number>;
    }>(`${this.baseUrl}/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }
}
