import { DatePipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/_services/general.service';
import { GlobalStore } from 'src/app/_store/global.store';
import { ClassStudyService } from '../../services/class-study.service';
import { AcademicService } from '../../services/academic.service';

@Component({
  selector: 'app-modal-import-student',
  templateUrl: './modal-import-student.component.html',
  styleUrls: ['./modal-import-student.component.scss'],
  standalone: true,
  imports: [
    TranslocoModule, 
    FormsModule, 
    NgIf, 
    InputComponent,
    ButtonComponent
  ],
  providers: [DatePipe]
})
export class ModalImportStudentComponent implements OnInit {
  @Input() dataModal: any;
  @Output() dataModalEmit = new EventEmitter<any>();
  dataFromParent: any;
  fileName: string ='';
  file: any = null;
  data: any[] = [];  // Dữ liệu từ file Excel sẽ được lưu ở đây
  subjects = [];
  dataListClass = [];
  dataAcademicName = [];


  nzNotFoundContent: string = 'employee.notFoundContent';
  // schoolId: string = '';

  constructor(
    private activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private router: Router,
    private generalService: GeneralService,
    private globalStore:GlobalStore,
    private classStudyService: ClassStudyService,
    private academicService: AcademicService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.dataFromParent = this.dataModal.dataFromParent;
    this.getListDataClasses();
    this.getListAcademic();
  }

  private getListAcademic(): void{
    this.globalStore.isLoading = true;
    let dataRequest = {
      keyword: ""
    }
    this.academicService.getListAcademicYear(dataRequest).subscribe((res: any) => {
      res?.data?.data.map((item) => {
        this.dataAcademicName.push(item.name)
      })
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.globalStore.isLoading = false;
      this.showMessageService.error(err);
    })
  }

  private getListDataClasses(): void{
    this.globalStore.isLoading = true;
    let dataRequest = {
      school_year_id: localStorage.getItem('SchoolYearFirst'),
      size: 100,
      page: 1,
      search: ""
    }
    this.classStudyService.getListClass(dataRequest).subscribe((res: any) => {
      // this.dataListClass = res;
      res.data.classes.map((item) => {
        // this.dataListClass.push({
        //   label: item.name,
        //   value: item.id
        // })
        this.dataListClass.push(item.name)
      })
      this.dataListClass
      this.globalStore.isLoading = false;
    }, (err) =>{
      this.showMessageService.error(err);
    })
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  confirmSubmitForm(file){
    if(!this.validateHeaders(file) || !this.validateData(file)){
      return;
    }

    let dataRequest = [];
    if(this.data.length > 30){
      this.showMessageService.error("File excel số lượng học sinh > 30");
      return;
    }
    this.data.map((item, index) => {
      if(index > 0){
        dataRequest.push({
          fullname: item[2],
          address: item[7],
          dob: this.datePipe.transform(item[6], "yyyy-MM-dd"),
          gender: item[3] == "Nam" ? 1 : 2,
          status: 2,
        })
      }
    })
    this.dataModalEmit.emit(dataRequest);
    this.activeModal.close(true);
  }


  onFileChangConfirm(): void {
    // const file = event.target.files[0];
    if (this.file) {
      this.readExcel(this.file);
    }
  }

  async readExcel(file: File): Promise<void> {
    const reader = new FileReader();

    reader.onload = async (e: any) => {
      const buffer = e.target.result;
      const workbook = new ExcelJS.Workbook();
      
      // Đọc dữ liệu từ buffer
      await workbook.xlsx.load(buffer);

      const worksheet = workbook.worksheets[0];  // Chọn sheet đầu tiên

      this.data = [];  // Xóa dữ liệu cũ trước khi nhập dữ liệu mới

      worksheet.eachRow((row, rowNumber) => {
        // Lưu từng hàng dữ liệu vào mảng
        const rowData = row.values;
        this.data.push(rowData);
      });

      this.confirmSubmitForm(workbook.getWorksheet(1));
    };

    // Đọc file dưới dạng ArrayBuffer
    reader.readAsArrayBuffer(file);
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.slice(-5) == '.xlsx' || event.target.files[0].name.slice(-4) == '.xls') {
        this.fileName = event.target.files[0].name;
        this.file = file;
      } else {
        this.showMessageService.warning(translate('errorFileExcel'))
      }
    }
  }

  uploadFile() {
    document.getElementById('input-file-upload-parent').click();
  }

  
    // Thời khóa biểu mẫu
    studentDemoExcel = [
      { STT: 1, THÔNG_TIN_HOC_SINH: 'Nguyễn Duy Kiên', GIỚI_TÍNH: 'Nam', NIÊN_KHÓA: 'NKNEW12', TRẠNG_THÁI: 'Đang học', NGÀY_SINH: '1/1/2004', ĐỊA_CHỈ: "HÀ NỘI"},
    ];
  
  exportTimetable(): void {
    // Tạo workbook và worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Dữ liệu học sinh');

    // Tạo header
    worksheet.columns = [
      { header: 'STT', key: 'STT', width: 10 },
      { header: 'Thông tin học sinh', key: 'THÔNG_TIN_HOC_SINH', width: 15 },
      { header: 'Giới tính', key: 'GIỚI_TÍNH', width: 15 },
      { header: 'Niên khóa', key: 'NIÊN_KHÓA', width: 15 },
      { header: 'Trạng thái', key: 'TRẠNG_THÁI', width: 15 },
      { header: 'Ngày sinh', key: 'NGÀY_SINH', width: 15 },
      { header: 'Địa chỉ', key: 'ĐỊA_CHỈ', width: 15 }
    ];

    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF00B0F0' } // Màu xanh sáng
      };
    });

    // Thêm dữ liệu mẫu
    this.studentDemoExcel.forEach((row,index) => {
      const excelRow = worksheet.addRow(row);

      excelRow.getCell('A').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'B8CCE4' } // Màu vàng
      };
    });

    // Thêm data validation cho các cột (Thứ 2 -> Thứ 6)
    let dataStatus = ["Đang học", "Chưa vào lớp", "Nghỉ học"];
    let gender = ["Nam", "Nữ"]
    const columnIndexes = ['B', 'C', 'D', 'E', 'F', 'G']; // Cột tương ứng Thứ 2 -> Thứ 6
    columnIndexes.forEach(col => {
      for (let i = 2; i <= 100; i++) {
        let cell = worksheet.getCell(`${col}${i}`);
        if(col == "C"){
          cell.dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: [`"${gender.join(',')}"`], // Sử dụng `formulae`
          };
        }else if(col == "D"){
          cell.dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: [`"${this.dataAcademicName.join(',')}"`], // Sử dụng `formulae`
          };
        }else if(col == "E"){
          cell.dataValidation = {
            type: 'list',
            allowBlank: true,
            formulae: [`"${dataStatus.join(',')}"`], // Sử dụng `formulae`
          };
        }else if(col == "F"){
          // cell.dataValidation = {
          //   type: 'list',
          //   allowBlank: true,
          //   formulae: [`"${dataStatus.join(',')}"`], // Sử dụng `formulae`
          // };
        }
      }
    });

    // Xuất file Excel
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'File_mau_import_hoc_sinh.xlsx');
    });
  }

  private validateHeaders(worksheet: ExcelJS.Worksheet): boolean {
    const requiredHeaders = [
      'STT',
      'Thông tin học sinh',
      'Giới tính',
      'Niên khóa',
      'Trạng thái',
      'Ngày sinh',
      'Địa chỉ',
    ];
  
    const fileHeaders: string[] = [];
    worksheet.getRow(1).eachCell((cell) => {
      fileHeaders.push(cell.text.trim());
    });
  
    // Kiểm tra tiêu đề trong file có khớp với tiêu đề yêu cầu
    const isValidHeaders = requiredHeaders.every(header => fileHeaders.includes(header));
    if (!isValidHeaders) {
      this.showMessageService.error('Tiêu đề trong file Excel không đúng định dạng.');
      return false;
    }
  
    return true;
  }

  validateData(worksheet: ExcelJS.Worksheet): boolean {
    let isValid = true;
  
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Bỏ qua tiêu đề
  
      const [DEFAULT,stt, studentInfo, gender, year, status, dob, address] = row.values as string[];
      if (
        !stt ||
        !studentInfo ||
        !['Nam', 'Nữ'].includes(gender) || // Kiểm tra giới tính
        !status ||
        isNaN(Date.parse(dob as string)) || // Kiểm tra ngày sinh
        !address
      ) {
        isValid = false;
        if(!isValid){
          this.showMessageService.error(`Dữ liệu dòng ${rowNumber} không đúng định dạng.`);
        }
      }
    });
  
    return isValid;
  }
}
