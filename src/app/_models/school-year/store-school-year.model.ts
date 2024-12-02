export interface StoreSchoolYear {
  id?: string;
  name: string;
  code: string;
  startDate: number;
  endDate: number;
  gradeCirculars: GradeCircularsSchoolYear[];
  terms: TempSchoolYear[];
  status: number;
  isLockGradebookInput: number;
}

export interface TempSchoolYear {
  index: number;
  name: string;
  startDate: number;
  endDate: number;
  isDisplayReport: number;
  isCurrent: number;
  isPublishReport?: number;
}

export interface GradeCircularsSchoolYear {
  gradeId: string;
  circularsId: string;
}

export interface SchoolYear {
  id: string;
  tenantId?: string;
  name: string;
  code: string;
  startDate: number;
  endDate: number;
  status: number
}
