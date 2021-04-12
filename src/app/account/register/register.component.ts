import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/Services/account.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';   

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  constructor(private fb: FormBuilder,private accountService: AccountService,private router:Router) {
  this.angForm = this.fb.group({
  email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  password: ['', Validators.required],
  name: ['', Validators.required]
  });
  }
  
  ngOnInit() {
  }
  
  postdata(angForm1)
  {
  this.accountService.userregistration(angForm1.value.name,angForm1.value.email,angForm1.value.password)
  .pipe(first())
  .subscribe(
  data => {
  this.router.navigate(['login']);
  },
  
  error => {
    console.log(error);
  });
  }
  
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }
  get name() { return this.angForm.get('name'); }
  }