import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/auth/pages/login/login.component';
import { AdminComponent } from './features/admin/pages/admin/admin.component';
import { AgentComponent } from './features/agent/pages/agent/agent.component';
import { ClientComponent } from './features/client/pages/client/client.component';

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
    path: 'client',
    component: ClientComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'CLIENT'
    }
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}