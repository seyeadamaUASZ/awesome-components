import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '../../models/candidate.model';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CandidateListComponent implements OnInit {
  
  //@Input() obj!:{ firstName:string, lastName:string};
  
  loading$!:Observable<boolean>;
  candidates$!:Observable<Candidate[]>;
  
  constructor(private cdr:ChangeDetectorRef,
    private candidateService:CandidateService) { }

  ngOnInit(): void {
    //manuellement
    //this.cdr.detectChanges()
    //this.cdr.markForCheck()

    this.initObservable();
    this.candidateService.getCandidates()
  }

  private initObservable(){
    this.loading$ = this.candidateService.loading$;
    this.candidates$=this.candidateService.candidates$;
  }

}
