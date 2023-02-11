import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-table',
  styleUrls: ['home.component.scss'],
  templateUrl: 'home.component.html',
})
export class HomeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['serial', 'profileImage', 'firstName', 'lastName', 'email', 'phoneNumber', 'action'];
  isEditUserDetails = false;
  pageSize = 5;
  totalCount = 100;
  pageIndex = 0;
  pageEvent: PageEvent | any;
  storeTableData = [];
  data = new MatTableDataSource<TableElement>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  editUserDetails: TableElement;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getUsers(0);
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator;
  }

  public handlePage(e: any) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getUsers(this.pageIndex);
  }

  getUsers(page: number) {
    const url =
      environment.apiUrl + 'user' + '/' + page + '/' + this.pageSize;
    this.httpClient.get(url).subscribe(
      (success: { count: number; data: []; status: string }) => {
        this.data.data = success.data.reverse();
        this.storeTableData = this.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDelete(userDetails: TableElement) {
    const url = environment.apiUrl + 'user' + '/' + userDetails._id;
    this.httpClient.delete(url).subscribe(
      () => {
        const dataSource = this.data.data;
        dataSource.splice(this.data.data.indexOf(userDetails), 1);
        this.data.data = dataSource;
        this.storeTableData = this.data.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onAddNewUser() {
    if (this.isEditUserDetails) {
      this.isEditUserDetails = false;
    } else {
      this.isEditUserDetails = true;
    }
    this.editUserDetails = {
      _id: '',
      firstName: '',
      lastName: '',
      email: '',
      profileImage: '',
      phoneNumber: null
    };
  }

  onEditFinished(editedUserDetail: TableElement) {
    this.isEditUserDetails = false;
    if (this.data.data.find(object => object._id.toString() === editedUserDetail._id.toString())) {
      const dataSource = this.data.data;
      dataSource.map((element) => {
        if (element._id === editedUserDetail._id) {
          return (element = editedUserDetail);
        }
      });
      this.data.data = dataSource;
      this.storeTableData = this.data.data;
    } else {
      this.data.data.push(editedUserDetail);
      this.storeTableData = this.data.data;
    }
  }

  onEdit(userDetails: TableElement) {
    this.isEditUserDetails = true;
    this.editUserDetails = userDetails;
  }
}

export interface TableElement {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  phoneNumber: number;
}
