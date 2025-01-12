import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { translate, TranslocoModule } from '@ngneat/transloco';
import { ShowMessageService } from 'src/app/_services/show-message.service';
import { ButtonComponent } from 'src/app/_shared/components/button/button.component';
import { InputComponent } from 'src/app/_shared/components/input/input.component';
import { ParentService } from '../../services/parent.service';
import { GeneralService } from 'src/app/_services/general.service';
import { GlobalStore } from 'src/app/_store/global.store';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-modal-import-timetable',
  templateUrl: './modal-import-timetable.component.html',
  styleUrls: ['./modal-import-timetable.component.scss'],
  standalone: true,
  imports: [
    TranslocoModule, 
    FormsModule, 
    NgIf, 
    InputComponent,
    ButtonComponent
  ]
})
export class ModalImportTimetableComponent implements OnInit {
  @Input() dataModal: any;
  @Output() dataModalEmit = new EventEmitter<any>();
  fileName: string ='';
  file: any = null;
  data: any[] = [];  // Dữ liệu từ file Excel sẽ được lưu ở đây

  nzNotFoundContent: string = 'employee.notFoundContent';
  // schoolId: string = '';

  constructor(
    private activeModal: NgbActiveModal,
    private showMessageService: ShowMessageService,
    private router: Router,
    private parentService: ParentService,
    private generalService: GeneralService,
    private globalStore:GlobalStore
  ) { }

  ngOnInit(): void {
  }

  closeModal(sendData: any) {
    this.activeModal.close(sendData);
  }

  confirmSubmitForm(){
    this.dataModalEmit.emit(this.data);
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

      this.confirmSubmitForm();
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

  subjects = [
      'Toán', 'Văn', 'Anh', 'Lý', 'Hóa', 'Sinh',
      'Sử', 'Địa', 'GDCD', 'Tin', 'Công nghệ',
      'Thể dục', 'Âm nhạc', 'Mỹ thuật'
    ];
  
    // Thời khóa biểu mẫu
    timetableTemplate = [
      { Tiet: 'Tiết 1', Thứ_2: '', Thứ_3: '', Thứ_4: '', Thứ_5: '', Thứ_6: '', Thứ_7: '' },
      { Tiet: 'Tiết 2', Thứ_2: '', Thứ_3: '', Thứ_4: '', Thứ_5: '', Thứ_6: '', Thứ_7: '' },
      { Tiet: 'Tiết 3', Thứ_2: '', Thứ_3: '', Thứ_4: '', Thứ_5: '', Thứ_6: '', Thứ_7: '' },
      { Tiet: 'Tiết 4', Thứ_2: '', Thứ_3: '', Thứ_4: '', Thứ_5: '', Thứ_6: '', Thứ_7: '' },
      { Tiet: 'Tiết 5', Thứ_2: '', Thứ_3: '', Thứ_4: '', Thứ_5: '', Thứ_6: '', Thứ_7: '' }
    ];
  
  exportTimetable(): void {
    // Tạo workbook và worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Thời khóa biểu');

    // Tạo header
    worksheet.columns = [
      { header: 'Tiết', key: 'Tiet', width: 10 },
      { header: 'Thứ 2', key: 'Thu 2', width: 15 },
      { header: 'Thứ 3', key: 'Thu 3', width: 15 },
      { header: 'Thứ 4', key: 'Thu 4', width: 15 },
      { header: 'Thứ 5', key: 'Thu 5', width: 15 },
      { header: 'Thứ 6', key: 'Thu 6', width: 15 },
      { header: 'Thứ 7', key: 'Thu 7', width: 15 }
    ];

    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF00B0F0' } // Màu xanh sáng
      };
    });

    // Thêm dữ liệu mẫu
    this.timetableTemplate.forEach((row,index) => {
      const excelRow = worksheet.addRow(row);

      excelRow.getCell('A').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'B8CCE4' } // Màu vàng
      };
    });

    // Thêm data validation cho các cột (Thứ 2 -> Thứ 6)
    const columnIndexes = ['B', 'C', 'D', 'E', 'F', 'G']; // Cột tương ứng Thứ 2 -> Thứ 6
    columnIndexes.forEach(col => {
      for (let i = 2; i <= this.timetableTemplate.length + 1; i++) {
        worksheet.getCell(`${col}${i}`).dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: [`"${this.subjects.join(',')}"`], // Sử dụng `formulae`
        };
      }
    });

    // Xuất file Excel
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'Thoi_Khoa_Bieu.xlsx');
    });
  }
}
