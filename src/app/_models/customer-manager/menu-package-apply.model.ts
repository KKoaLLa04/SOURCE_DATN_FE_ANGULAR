export interface MenuPackageApply {
    menuPackageId: string;
    menuPackageCode: string;
    menuPackageName: string;
    applicableSchoolTotal: number;
    applicableSchoolList: ApplicableSchool[];
    layoutList: Layout[];
}

export interface ApplicableSchool {
    schoolId: string;
    schoolName: string;
}

export interface Layout {
    layouId: string;
    layoutName: string;
}