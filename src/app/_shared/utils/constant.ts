import { Select2 } from "src/app/_models/gengeral/select2.model";
import { moduleCategoryTypeEnum } from "../enums/module-category.enum";

// 1. define value attendance
export const ATTENDANCE_STATUS_NOT_YET = 0; // Chưa thiết lập
export const ATTENDANCE_STATUS_ON_TIME = 1; // Đúng giờ
export const ATTENDANCE_STATUS_LATE = 2; // Đi muộn
export const ATTENDANCE_STATUS_EXCUSED_ABSENT = 3; // Vắng có phép
export const ATTENDANCE_STATUS_UNEXCUSED_ABSENT = 4; //Vắng không phép
export const ATTENDANCE_STATUS_EXCUSED_ABSENT_SCHEDULED = 5; // Vắng có phép (có kế hoạch)
export const ATTENDANCE_STATUS_EXCUSED_ABSENT_UNSCHEDULED = 6; // Vắng có phép (đột xuất)
export const ATTENDANCE_STATUS_NOT_SCHOOL_YET = 7; //Chưa đến trường



// 2. TIME_OUT_LISTEN_FIREBASE
export const TIME_OUT_LISTEN_FIREBASE = 10000;

// 3. regex
// export const REGEX_PHONE = /^(((0|0084|\+84)(3[2|3|4|5|6|7|8|9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|7|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})|((1900|1800)([0-9]{4}))|((1900|1800)([0-9]{6}))|((02)([0-9]{9}))))$/;
export const REGEX_PHONE = /^(((0|0084|\+84)(3[2|3|4|5|6|7|8|9]|5[6|8|9]|7[0|6|7|8|9]|8[1|2|3|4|5|6|7|8|9]|9[0|1|2|3|4|6|7|8|9])([0-9]{7})|((1900|1800)([0-9]{4}))|((1900|1800)([0-9]{6}))|((02)([0-9]{9}))))$/;
export const REGEX_EMAIL = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
export const REGEX_CODE = /^[a-zA-Z0-9-_]+$/;
export const REGEX_FULL_NAME = /^([0-9]*)([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s\w|\_|\-|\[|\]|\(|\)])$/;
export const REGEX_PASSWORD = /^([^ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏôốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s]+)$/;
// export const REGEX_USER_NAME = /^([^ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏôốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\s]+)$/;
export const REGEX_USER_NAME = /^[a-zA-Z0-9-_]+$/;
// export const REGEX_LINK = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
export const REGEX_LINK = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const REGEX_DOMAIN = /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const MAX_LENGTH_FULL_NAME = 255;
export const MAX_LENGTH_CODE = 50;
export const MAX_LENGTH_USERNAME = 50;
export const MAX_LENGTH_PASSWORD = 50;
export const MIN_LENGTH_PASSWORD = 6;
export const REGEX_GRADE = /^[0-9a-zA-Z\sÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỂỄỆỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]*$/

// 4. google captcha
export const GOOGLE_CAPTCHA_SITE_KEY = "6LdNXPsgAAAAANnEao1wbHB0LNLz8vD-CSsdTL4j";// site key gg captcha

// 5. layout
export const LAYOUTS = [
  { code: 'staff', name: 'Cán bộ nhân viên', desc: 'Layout của cán bộ nhân viên của tenant' },
  { code: 'teacher', name: 'Giáo viên', desc: 'Layout của giáo viên' },
  { code: 'parent', name: 'Phụ huynh', desc: 'Layout của phụ huynh' },
  { code: 'student', name: 'Học sinh', desc: 'Layout của học sinh' },
  { code: 'tenant', name: 'Quản trị Tenant', desc: 'Layout quản trị Tenant' },
  { code: 'campus', name: 'Campus', desc: 'Layout quản lý Campus' },
  { code: 'department', name: 'Sở', desc: 'Layout sở' },
  { code: 'division', name: 'Phòng', desc: 'Layout phòng' },
  { code: 'school', name: 'Trường', desc: 'Layout trường không sử dụng SO' },
]
export enum LAYOUTS_CODE {
  OMT = 'omt',
  TENANT = 'tenant',
  STAFF = 'staff',
  TEACHER = 'teacher',
  PARENT = 'parent',
  STUDENT = 'student',
  CAMPUS = 'campus',
  DEPARTMENT = 'department',
  DIVISION = 'division',
  SCHOOL = 'school'
}

// 6. default page size
export const PAGE_SIZE_DEFAULT = 15;
export const PAGE_INDEX_DEFAULT = 1;
export const PAGE_SIZE_OPTIONS_DEFAULT = [5, 10, 15, 20, 50];

// 7. message when call api error
export const MESSAGE_ERROR_CALL_API = "Có lỗi xảy ra trong quá trình xử lý";

// 8. khu vực
export const LOCATION = [
  { code: 'vn' },
  { code: 'en' },
  { code: 'jp' }
];

export const LOCATION_SELECT2:Select2[] = [
  { label: 'vn', value: 'vn' },
  { label: 'en', value: 'en'},
  { label: 'jp', value: 'jp'}
];

// 9. mũi giờ
export const TIMEZONE = [
  { code: 'UTC +07:00' }
];

export const TIMEZONE_SELECT2: Select2[] = [
  { label: 'Asia/Ho_Chi_Minh', value: 'Asia/Ho_Chi_Minh' },
];

// 10. ngôn ngữ
export const LANGUAGE = [
  { value: 'vi', label: 'vi', img: 'assets/images/png/vi.png' },
  { value: 'en', label: 'en', img: 'assets/images/png/flat-en.png' },
  { value: 'jp', label: 'jp', img: 'assets/images/png/ja.png' },
];

// 11. đơn vị tiền tệ
export const CURRENCY_UNIT = [
  { code: 'VND' },
  { code: 'DOLLAR' },
]

export const CURRENCY_UNIT_SELECT2 = [
  { label: 'VND', value: 'VND' },
  { label: 'DOLLAR', value: 'DOLLAR' },
]

// 12. tất cả gói menu
export const USE_MENU_ALL = 1;

// 13. status user
export const STATUS_USERS = [
  { value: 0, label: 'Bị khóa' },
  { value: 1, label: 'Kích hoạt' }
]

// 14. Avatar default
export const AVATAR_DEFAULT = "https://schoolonline-rebuild-dev.s3-ap-southeast-1.amazonaws.com/SO/2022/07/25/files/uploads/1658721291_1658721299786-Group 1000003688.png";
export const LOGO_DEFAULT = "assets/images/svg/img-default/logo-default.svg";
export const FAVICON_DEFAULT = "assets/images/svg/img-default/favicon-default.svg";
export const BACKGROUND_LOGIN_DEFAULT = "assets/images/svg/img-default/background-login-default.svg";

// 15. Training level
export const TRAINING_LEVEL = [
  { code: 5, label: 'EDUCATIONAL_STAGES_PRIMARY_SCHOOL', name: 'primarySchool' },
  { code: 4, label: 'EDUCATIONAL_STAGES_SECONDARY_SCHOOL', name: 'secondarySchool' },
  { code: 3, label: 'EDUCATIONAL_STAGES_HIGH_SCHOOL', name: 'highSchool' },
]

// 16. Permission
export const DATA_PERMISSION = {
  // role
  role_view: 'role_view',
  role_modify: 'role_modify',

  // Người dùng
  user_modify: 'user_modify', // minhnc
  user_view: 'user_view', //minhnc

  omt_access: 'omt_access', //duynq
  omt_manager: 'omt_manager', //duynq

  // Thông tư
  circulars_access: 'circulars_access', // minhnc
  circulars_manager: 'circulars_manager', // minhnc

  // Năm học
  school_year_access: 'school_year_access', // minhnc
  school_year_manager: 'school_year_manager', // minhnc

  moet_access: 'moet_access', //duynq
  moet_manager: 'moet_manager', //duynq
  tenant_update: 'tenant_update', //duynq
  tenant_show: 'tenant_show', //duynq

  //Module
  module_view: 'module_view', //thienlv
  module_modify: 'module_modify', //thienlv

  //Môn học
  subject_access: 'subject_access', //thienlv    //Xem thông tin quản lý môn học
  subject_manager: 'subject_manager', //thienlv  //Thêm, sửa, xóa môn học

  // menu
  menu_access:'menu_access',
  menu_manager:'menu_manager',

}

// Type môn học
export const SUBJECT_MOET = 'subject_moet'; // môn học moet (1)
export const SUBJECT_PRIVATE = 'subject_private'; // môn học riêng (2)
export const SUBJECT_BILINGUAL = 'subject_bilingual'; // môn học song ngữ (3)

// Các cấp đào tạo
export const EDUCATIONAL_STAGES_PRIMARY_SCHOOL = 'educational_stages_primary_school'; // tiểu học (5)
export const EDUCATIONAL_STAGES_SECONDARY_SCHOOL = 'educational_stages_secondary_school'; // trung học cơ sở (4)
export const EDUCATIONAL_STAGES_HIGH_SCHOOL = 'educational_stages_high_school'; // trung học phổ thông (3)
export const EDUCATIONAL_STAGES_CONTINUNING_EDUCATION = 'educational_stages_continuing_education'; // giáo dục thường xuyên (2)


// 17. method get code forgot password
export const METHOD_PHONE = 1;
export const METHOD_EMAIL = 2;

// 18. Trạng thái kích hoạt-Bị khóa
export const ARR_STATUS_ACTIVE = [
  {value: 0, label: 'Chưa kích hoạt'},
  {value: 1, label: 'Kích hoạt'},
]

export const STATUS_ACTIVE = {
  'IS_ACTIVE': 1,
  'IS_LOCK': 0
}

// 19. trạng thái năm học
export enum STATUS_SCHOOL_YEAR {SCHOOL_YEAR_STATUS_NO_ACTIVE = 0, SCHOOL_YEAR_STATUS_ACTIVE = 1, SCHOOL_YEAR_STATUS_NOT_YET = 2}

export const ARR_MODULE_CATEGORIES:Select2[] = [
  { label: String('moduleManager.moduleCategory'), value: '' },
  { label: String(moduleCategoryTypeEnum.GENERAL_INFORMATION_NAME), value: moduleCategoryTypeEnum.GENERAL_INFORMATION },
  { label: String(moduleCategoryTypeEnum.STUDY_INFORMATION_NAME), value: moduleCategoryTypeEnum.STUDY_INFORMATION },
  { label: String(moduleCategoryTypeEnum.SERVICE_NAME), value: moduleCategoryTypeEnum.SERVICE }
]

export const TIME_TABLE_STRUCT = {
    "sang": [
      {
        "hai": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "ba": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "tu": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "nam": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "sau": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "bay": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "chunhat": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      }
    ],
    "chieu": [
      {
        "hai": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "ba": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "tu": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "nam": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "sau": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "bay": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      },
      {
        "chunhat": {
          "tiet1": '',
          "tiet2": '',
          "tiet3": '',
          "tiet4": '',
          "tiet5": '',
        }
      }
    ]
}
