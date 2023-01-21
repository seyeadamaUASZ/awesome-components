import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, delay, Observable,tap,map } from "rxjs";
import { Candidate } from "../models/candidate.model";
import { environment } from "src/environments/environment";
@Injectable()
export class CandidateService{
    constructor(private http:HttpClient){
    }
    //behaviourSubject
    private _loading$ = new BehaviorSubject<boolean>(false);
    private lastCandidatesLoad=0;

    get loading$():Observable<boolean>{
        return this._loading$.asObservable();
    }

    private _candidates$ = new BehaviorSubject<Candidate[]>([]);
    get candidates$(): Observable<Candidate[]> {
     return this._candidates$.asObservable();
    }

    private setLoadingStatus(loading:boolean){
        this._loading$.next(loading);
    }

    getCandidates(){
        //le temps auquel ça était chargé et maintenant
        if(Date.now() - this.lastCandidatesLoad <=300000){
            return;
        }
        this.setLoadingStatus(true);
        this.http.get<Candidate[]>(`${environment.apiUrl}/candidates`)
        .pipe(
            delay(1000),
            tap(candidates=>{
                this.lastCandidatesLoad=Date.now()
                this.setLoadingStatus(false)
               this._candidates$.next(candidates)
            })
        ).subscribe();
    }

    getCandidateById(id:number):Observable<Candidate>{
        if (!this.lastCandidatesLoad) {
            this.getCandidates();
        }
        return this.candidates$.pipe( 
            map(candidates => candidates.filter(candidate => candidate.id===id)[0])
        );
    }

}