import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from '../resolvers/user.resolver';
import { ProfileComponent } from './profile/profile.component';
import { UsereditComponent } from './useredit/useredit.component';



const routes: Routes = [

  {
    path: 'me',
    component: ProfileComponent,
    resolve: {
      user: UserResolver
    },
    data: { animation: 'userProfile' }
  },
  {
    path: 'edit',
    component: UsereditComponent,
    resolve: {
      user: UserResolver
    },
    data: { animation: 'userEditProfile' }
  },
  {
    path: ':id',
    component: ProfileComponent,
    resolve: {
      user: UserResolver
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
