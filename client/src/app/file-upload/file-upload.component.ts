import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {environment} from '../../environments/environment';
import {Constants} from '../shared/constants';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @Output() getPath = new EventEmitter<string>();
  @Input() file: any;
  imageUrl = '';

  sendPath(value: string) {
    this.getPath.emit(value);
  }

  constructor(private httpClient: HttpClient) {}
  ngOnInit(): void {
  }

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(event: any) {
    this.prepareFilesList(event.files);
  }

  deleteFile() {
    this.file = null;
    this.imageUrl = '';
    this.sendPath(this.imageUrl);
  }

  uploadFiles() {
    const url = environment.apiUrl + 'upload';
    const formData: FormData = new FormData();
    formData.append('file', this.file);
    this.httpClient.post(url, formData).subscribe(
      (success: { status: string; imageUrl: string }) => {
        this.file.progress = Constants.success;
        this.getPath.emit(success.imageUrl);
        console.log(this.file, success);
      },
      (error) => {
        this.file.progress = Constants.failed;
        console.log(error);
      }
    );
  }

  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 'start';
      this.file = item;
    }
    this.uploadFiles();
  }

  formatBytes(bytes: number, decimals = 1) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
