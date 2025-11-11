export interface House {
  id: string;
  tenantId: string;
  name: string;
  streetName: string;
  streetNumber?: string;
  district: string;
  city: string;
  state: string;
  zipcode: string;
  siteUrl?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
