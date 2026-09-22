import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/pages/login/login.component';
import { AdminComponent } from './features/admin/pages/admin/admin.component';
import { AgentComponent } from './features/agent/pages/agent/agent.component';
import { UserComponent } from './features/user/pages/user/user.component';

import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'ADMIN'
    }
  },

  {
    path: 'agent',
    component: AgentComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'AGENT'
    }
  },

  {
    path: 'user',
    component: UserComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'USER'
    }
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}