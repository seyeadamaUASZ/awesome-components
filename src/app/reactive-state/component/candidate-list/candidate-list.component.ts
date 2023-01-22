import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, startWith,map, combineLatest } from 'rxjs';
import { CandidateSearchType } from '../../enums/candidate-search-type.enum';
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
  searchCtrl!:FormControl;
  searchTypeCtrl!:FormControl;
  searchTypeOptions!:{
     value:CandidateSearchType,
     label:string
  }[];

  constructor(private cdr:ChangeDetectorRef,
    private candidateService:CandidateService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    //manuellement
    //this.cdr.detectChanges()
    //this.cdr.markForCheck()
    this.initForm();
    this.initObservable();
    this.candidateService.getCandidates()
  }

  initForm(){
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl= this.formBuilder.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions=[
      {value:CandidateSearchType.LASTNAME,label:'Nom'},
      {value:CandidateSearchType.FIRSTNAME,label:'Prénom'},
      {value:CandidateSearchType.COMPANY,label:'Entreprise'}
    ]
  }

  private initObservable(){
    this.loading$ = this.candidateService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe( 
      startWith(this.searchCtrl.value),
      map(value=>value.toLowerCase())
    );
    const searchType$:Observable<CandidateSearchType> =  this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );
   //first option for load data //this.candidates$=this.candidateService.candidates$;
   this.candidates$=combineLatest([
    search$,
    searchType$,
    this.candidateService.candidates$
   ]).pipe(
    map(([search,searchType,candidates])=> candidates.filter(candidate=>candidate[searchType]
      .toLowerCase()
      .includes(search as string)))
   )
  }

}
