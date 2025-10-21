// frontend/src/app/modules/user/user.routes.ts

import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list';
import { UserFormComponent } from './user-form/user-form';
import { UploadExcelComponent } from './upload-excel/upload-excel';

export const USER_ROUTES: Routes = [
  { path: '', component: UserListComponent },                   
  { path: 'new', component: UserFormComponent },                 
  { path: 'edit/:id', component: UserFormComponent },            
  { path: 'upload', component: UploadExcelComponent }            
];