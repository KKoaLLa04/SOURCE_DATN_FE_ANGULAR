import { Component, OnInit } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: true,
  imports: [
    NgFor
  ]
})
export class DemoComponent implements OnInit {

  constructor() { }
  data: any = [[1, 2], [3, 4]];
  ngOnInit() {
  }

  // onFileChange(evt: any) {
  //   /* wire up file reader */
  //   const target: DataTransfer = <DataTransfer>(evt.target);
  //   if (target.files.length !== 1) throw new Error('Cannot use multiple files');
  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {
  //     /* read workbook */
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

  //     /* grab first sheet */
  //     const wsname: string = wb.SheetNames[0];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];

  //     /* save data */
  //     this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
  //     console.log(this.data);
  //   };
  //   reader.readAsBinaryString(target.files[0]);
  // }

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
