import { Component, OnInit, Input } from '@angular/core';
import { UppercasePipe } from '../../pipe/uppercase.pipe';
import { FormatTimePipe } from '../../pipe/format-time.pipe';
import { ReplaceClassNamePipe } from '../../pipe/replace-classname.pipe';
import QRCode from 'qrcode';
import { toPng } from 'html-to-image';

@Component({
  selector: 'app-card-student',
  templateUrl: './card-student.component.html',
  styleUrls: ['./card-student.component.scss'],
  standalone: true,
  imports: [UppercasePipe, FormatTimePipe, ReplaceClassNamePipe],
})
export class CardStudentComponent implements OnInit {
  @Input({ required: true }) id!: number;
  @Input({ required: true }) fullname!: string;
  @Input({ required: true }) birthday!: number;
  @Input({ required: true }) classroomName!: string;
  @Input({ required: true }) studentCode!: string;

  qrcode?: string;
  constructor() {}

  ngOnInit() {
    this.generateQRCodeBase64().then(() => {});
  }

  async generateQRCodeBase64(): Promise<void> {
    try {
      this.qrcode = await QRCode.toDataURL(
        `http://localhost:4200/redirect-student/${this.id}`
      );
    } catch (error) {
      // không thể tạo
      console.log(error);

    }
  }

  async downloadElementAsPng() {
    const element = document.getElementById('CO_DINH');
    if (!element) {
        throw new Error('Element not found!');
    }

    try {
        const pngDataUrl = await toPng(element, {width: 1016, height: 638});
        const link = document.createElement('a');
        link.href = pngDataUrl;
        link.download = `the_diem_danh_hs_${this.id}.png`;
        link.click();
    } catch (error) {
        console.error('Error generating PNG:', error);
    }
}
}
