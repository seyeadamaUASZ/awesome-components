import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './component/candidate-list/candidate-list.component';
import { SingleCandidateComponent } from './component/single-candidate/single-candidate.component';

const routes: Routes = [
  {path:'candidates',component:CandidateListComponent},
  {path:'candidates/:id',component:SingleCandidateComponent},
  {path:'',redirectTo:'candidates',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactiveStateRoutingModule { }
