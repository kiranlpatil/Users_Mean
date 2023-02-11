import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddUserComponent} from './add-user/add-user.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DndDirective } from './dnd.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUserComponent,
    FileUploadComponent,
    DndDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
  exports: [DndDirective]
})
export class AppModule {}
