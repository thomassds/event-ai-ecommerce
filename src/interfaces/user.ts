export interface User {
  id: string;
  name: string;
  taxIdentifier: string;
  phone?: string;
  email?: string;
  password?: string;
  avatar?: string;
  country?: string;
  city?: string;
  state?: string;
  reference?: string;
  complement?: string;
  number?: string;
  neighborhood?: string;
  street?: string;
  zipCode?: string;
  longitude?: number;
  latitude?: number;
}

export interface ICreateUser {
  name: string;
  taxIdentifier: string;
  phone?: string;
  email?: string;
  password?: string;
  avatar?: string;
  country?: string;
  city?: string;
  state?: string;
  reference?: string;
  complement?: string;
  number?: string;
  neighborhood?: string;
  street?: string;
  zipCode?: string;
  longitude?: number;
  latitude?: number;
}
