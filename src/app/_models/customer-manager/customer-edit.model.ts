export interface CustomerEdit {
  id: string;
  name: string;
  createdDate: string;
  logo: string;
  backgroundLogin: string;
  code: string;
  domain: string;
  isActive: number;
  useMenu: string[] | number[];
  phone: string;
  email: string;
  address: string;
  areaCode: string;
  timeZoneCode: string;
  languageCode: string;
  monetaryUnitCode: string;
}
