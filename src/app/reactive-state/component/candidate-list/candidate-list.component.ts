import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  
  constructor(private cdr:ChangeDetectorRef,
    private candidateS:CandidateService) { }

  ngOnInit(): void {
    //manuellement
    //this.cdr.detectChanges()
    //this.cdr.markForCheck()

    this.loading$ = this.candidateS.loading$;
  }

}
