import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: true,
  imports: [

  ]
})
export class DemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  exportAsExcel() {
    // Dữ liệu mẫu để export
    const data = [
      { Name: 'John', Age: 25, Gender: 'Male' },
      { Name: 'Jane', Age: 30, Gender: 'Female' }
    ];
  
    // Chuyển dữ liệu sang định dạng sheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
  
    // Tạo workbook
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Sheet1': worksheet },
      SheetNames: ['Sheet1']
    };
  
    // Xuất file Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    // Lưu file
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'ExportedData.xlsx');
  }
}
