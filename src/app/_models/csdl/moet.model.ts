export interface DepartmentList {
  id: string,
  code: string,
  name: string,
  level: number,
  indexOrder: number,
  totalDivision: number,
  totalSchool: number
}

export interface DivisionList {
  id: string;
  code: string;
  name: string;
  level: number;
  departmentCode: string;
  indexOrder: number;
  totalHighSchool: number;
  totalSecondarySchool: number;
  totalPrimarySchool: number;
}

export interface SchoolList {
  id: string,
  code: string,
  name: string,
  level: number,
  indexOrder: number,
  departmentCode: string | null,
  divisionCode: null | string,
  phone: string,
  email: string,
  address: string
}
