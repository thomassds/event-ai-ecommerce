export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email: string;
  taxIdentifier: string;
  domain: string;
  slug?: string;
}
