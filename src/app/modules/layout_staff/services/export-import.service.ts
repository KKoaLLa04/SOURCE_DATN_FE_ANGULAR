import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExportImportService {

  exportToExcel(data: any[], fileName: string): void {
    // Tạo workbook và worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


    ws["!cols"] = [
      { wch: 5 }, // Độ rộng cột 1 (STT)
      { wch: 30 }, // Thông tin học sinh
      { wch: 15 }, // Lớp học
      { wch: 10 }, // Giới tính
      { wch: 15 }, // Niên khóa
      { wch: 20 }, // Trạng thái
      { wch: 30 }, // Phụ huynh
    ];

    // Ghi file Excel
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array', cellStyles: true });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    // Tải file xuống
    saveAs(blob, `${fileName}.xlsx`);
  }
}
