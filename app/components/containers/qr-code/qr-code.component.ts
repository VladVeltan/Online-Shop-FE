import { Component, OnInit } from '@angular/core';
import * as qrcode from 'qrcode';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
  qrCodeUrl:string=environment.apiUrl+'/register';
  qrCodeDataUrl: string = '';
  constructor() {}

  ngOnInit(): void {
    this.generateQRCode();
  }

  generateQRCode(): void {
    qrcode.toDataURL(this.qrCodeUrl)
    .then(url => {
      this.qrCodeDataUrl = url;
    })
    .catch(err => {
      console.error(err)
    })
  }
  downloadQRCode(): void {
    if (this.qrCodeDataUrl) {
      const link = document.createElement('a');
      link.href = this.qrCodeDataUrl;
      link.download = 'qrcode.png';
      link.click();
    }
  }
  
}
