import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllShowsComponent } from './all-shows/all-shows.component';
import { SearchShowsComponent } from './search-shows/search-shows.component';
import { ShowDetailsComponent } from './show-details/show-details.component';


const routes: Routes = [
  {path: '', component: AllShowsComponent},
  {path: 'showdetails/:id', component: ShowDetailsComponent},
  {path: 'search/:id', component: SearchShowsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
