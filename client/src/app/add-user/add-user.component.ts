import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from '../shared/constants';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @Output() updatedUser = new EventEmitter<any>();
  @Input() user = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    profileImage: '',
    phoneNumber: null,
  };

  constructor(private snackBar: MatSnackBar, private httpClient: HttpClient) {}

  ngOnInit(): void {}

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  imagePath(path: string) {
    this.user.profileImage = path;
  }

  validateInputs(user: any) {
    const fields = Constants.columns;
    let invalidForm = false;
    fields.forEach(field => {
      if (!user[field]) {
        this.openSnackBar(Constants.getWarnings(field));
        invalidForm = true;
      }
    });
    if (user) {
      return false;
    }
    return true;
  }

  addUser() {
    if (!this.validateInputs(this.user)) {
      return;
    }
    if (!this.user?.profileImage) {
      this.openSnackBar(Constants.profileImage);
      return;
    }
    if (!Constants.validateEmail(this.user?.email)) {
      this.openSnackBar(Constants.email);
      return;
    }
    if (this.user._id) {
      const url = environment.apiUrl + 'user';
      this.httpClient.patch(url + '/' + this.user._id, this.user).subscribe(
        (success: { status: string; message: string; data }) => {
          if (success.status === Constants.success) {
            this.openSnackBar(Constants.userAdded);
            this.updatedUser.emit(success.data);
          } else {
            this.openSnackBar(success.message);
          }
        },
        () => {
          this.openSnackBar(Constants.taskFailed);
        }
      );
    } else {
      const url = environment.apiUrl + 'user' + '/' + 'add-user';
      delete this.user._id;
      this.httpClient.post(url, this.user).subscribe(
        (success: { status: string; message: string, data }) => {
          if (success.status === Constants.success) {
            this.openSnackBar(Constants.userAdded);
            this.updatedUser.emit(success.data);
          } else {
            this.openSnackBar(success.message);
          }
        },
        () => {
          this.openSnackBar(Constants.taskFailed);
        }
      );
    }
  }
}
