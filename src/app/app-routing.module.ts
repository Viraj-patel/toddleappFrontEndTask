import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';


const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  {
    path : "home" ,
    component : MainComponent
  },
  {
    path : "**",
    component : MainComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
