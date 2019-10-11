import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageCompressComponent } from './image-compress/image-compress.component';

const routes: Routes = [
  {path:'home',component:ImageCompressComponent},
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
