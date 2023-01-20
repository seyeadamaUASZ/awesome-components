import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators,AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators'
import { ComplexFormService } from '../../services/complex-form.service';
import { confirmEqualValidator } from '../../validators/confirm-equal.validator';
import { validValidator } from '../../validators/valid.validator';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;
  phoneCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;


  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;
  showEmailError$!: Observable<boolean>;
  showPasswordError$!:Observable<boolean>;

  loading = false;

  constructor(private formBuilder: FormBuilder,private complexFormService:ComplexFormService) { }

  ngOnInit(): void {
    this.initFormControls()
    this.initMainForm()
    this.initFormObservables();
  }

  initMainForm(): void {
    this.mainForm = this.formBuilder.group({
        personalInfo: this.personalInfoForm,
        contactPreference: this.contactPreferenceCtrl,
        email: this.emailForm,
        phone: this.phoneCtrl,
        loginInfo: this.loginInfoForm
    });
  }

  private initFormControls(): void {
    this.personalInfoForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
    });
    this.contactPreferenceCtrl = this.formBuilder.control('email');

    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailForm = this.formBuilder.group({
        email: this.emailCtrl,
        confirm: this.confirmEmailCtrl
},{Validators:[confirmEqualValidator('email','confirm')],updateOn:'blur'}
);
    this.phoneCtrl = this.formBuilder.control('');
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.loginInfoForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl
},{Validators:[confirmEqualValidator('password','confirmPassword')],updateOn:'blur'});
}

onSubmitForm() {
  this.loading = true;
  this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved => {
          this.loading = false;
          if (saved) {
            this.resetForm()
          } else {
              console.log('Echec')
          }
      })
  ).subscribe();
}

private resetForm(){
  this.mainForm.reset();
  this.contactPreferenceCtrl.patchValue('email');
}

  private initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
        startWith(this.contactPreferenceCtrl.value),
        map(preference => preference === 'email'),
        tap(showEmailCtrl=> this.setEmailValidators(showEmailCtrl))
    );
    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
        startWith(this.contactPreferenceCtrl.value),
        map(preference => preference === 'phone'),
        tap(showPhoneCtrl => this.setPhoneValidator(showPhoneCtrl) )
    );
    this.showEmailError$ = this.emailForm.statusChanges.pipe(
      map(status=>status==='INVALID' && this.emailCtrl.value && this.confirmEmailCtrl.value)
    );

    this.showPasswordError$ = this.loginInfoForm.statusChanges.pipe( 
      map(status=>status==='INVALID' && 
      this.passwordCtrl.value &&
       this.confirmPasswordCtrl.value && this.loginInfoForm.hasError('confirmEqual'))
    )

}

private setEmailValidators(showEmailCtrl:boolean){
  if(showEmailCtrl){
    this.emailCtrl.addValidators([Validators.required,Validators.email])
    this.confirmEmailCtrl.addValidators([Validators.required,Validators.email])
  }else{
    this.emailCtrl.clearValidators()
    this.confirmEmailCtrl.clearValidators()
  }
  this.emailCtrl.updateValueAndValidity();
  this.confirmEmailCtrl.updateValueAndValidity();
}

private setPhoneValidator(showPhoneCtrl:boolean){
  if(showPhoneCtrl){
    this.phoneCtrl.addValidators([Validators.required,Validators.minLength(10),Validators.maxLength(10)]);
   }else{
    this.phoneCtrl.clearValidators();
   } 
   this.phoneCtrl.updateValueAndValidity();
}


getFormControlErrorText(ctrl: AbstractControl) {
  if (ctrl.hasError('required')) {
    return 'Ce champ est requis';
  } else if (ctrl.hasError('email')) {
      return 'Merci d\'entrer une adresse mail valide';
  } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
  } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
  }
  else if (ctrl.hasError('validValidator')) {
    return 'l\email n\'est pas valid';
   } 
  
  else {
      return 'Ce champ contient une erreur';
  }
}


}
