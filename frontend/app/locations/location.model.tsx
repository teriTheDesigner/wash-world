export interface ServiceUnit {
  id: number;
  type: string;
  totalCount: number;
  machineType?: string | null;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  openHours: string;
  maxHeight: string;
  wheelWidth: string;
  mirrorLength: string;
  imageUrl: string;
  url: string;
  message?: string | null;
  hasAddons: boolean;
  serviceUnits: ServiceUnit[];
}
