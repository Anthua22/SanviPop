import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserResolver } from './resolvers/user.resolver';


const routes: Routes = [

  {
    path: 'me',
    component: ProfileComponent
  },
  {
    path:':id',
    component:ProfileComponent,
    resolve:{
      user:UserResolver
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
