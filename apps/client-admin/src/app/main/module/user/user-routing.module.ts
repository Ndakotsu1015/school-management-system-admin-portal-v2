import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailPageComponent } from './pages/user-detail-page/user-detail-page.component';
import { UserGroupDetailPageComponent } from './pages/user-group-detail-page/user-group-detail-page.component';
import { UserGroupListPageComponent } from './pages/user-group-list-page/user-group-list-page.component';
import { UserGroupNewPageComponent } from './pages/user-group-new-page/user-group-new-page.component';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { UserNewPageComponent } from './pages/user-new-page/user-new-page.component';

const routes: Routes = [
  {
    path: 'users',
    children: [
      { path: 'list', component: UserListPageComponent },
      { path: 'detail/:uid', component: UserDetailPageComponent },
      { path: 'new', component: UserNewPageComponent },
    ],
  },
  {
    path: 'groups',
    children: [
      { path: 'list', component: UserGroupListPageComponent },
      { path: 'detail/:uid', component: UserGroupDetailPageComponent },
      { path: 'new', component: UserGroupNewPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
