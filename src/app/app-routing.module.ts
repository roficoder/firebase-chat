import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Path } from './shared/helpers/enum';

const routes: Routes = [
  { path: '', redirectTo: Path.public, pathMatch: 'full' },
  {
    path: Path.public, loadChildren: () => import('./public/public.module')
      .then(m => m.PublicModule),
  },
  {
    path: Path.private, loadChildren: () => import('./private/private.module')
      .then(m => m.PrivateModule),
  },

  { path: '**', redirectTo: Path.public, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
