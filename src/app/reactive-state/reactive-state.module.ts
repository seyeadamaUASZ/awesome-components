import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { CandidateListComponent } from './component/candidate-list/candidate-list.component';
import { SingleCandidateComponent } from './component/single-candidate/single-candidate.component';
import { CandidateService } from './services/candidate.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CandidateListComponent,
    SingleCandidateComponent
  ],
  imports: [
    CommonModule,
    ReactiveStateRoutingModule,
    SharedModule
  ],
  providers:[CandidateService]
})
export class ReactiveStateModule { }
