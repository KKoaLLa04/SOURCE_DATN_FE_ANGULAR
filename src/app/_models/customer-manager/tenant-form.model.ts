export interface TenantFormEdit {
    id: string;
    logo: string;
    name: string;
    favicon: string;
    backgroundLogin: string;
    domain: string;
    isActive: number;
    phone: string;
    email: string;
    address: string;
    areaCode: string;
    timeZoneCode: string;
    languageCode: string;
    monetaryUnitCode: string;
}

export interface TenantFormCreate {
  logo: string;
  name: string;
  code: string;
  favicon: string;
  backgroundLogin: string;
  domain: string;
  isActive: number;
  phone: string;
  email: string;
  address: string;
  areaCode: string;
  timeZoneCode: string;
  languageCode: string;
  monetaryUnitCode: string;
}
