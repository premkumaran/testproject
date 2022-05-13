import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: any = FormGroup;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.formvalidaiton();
  }

  private formvalidaiton() {
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      password: ["",Validators.required]
    });
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      console.log("invalid");
      return;
    } else {
      console.log("loginForm.values", this.loginForm.value);
      this.http.post<any>('http://localhost:3000/api/login',this.loginForm.value).subscribe((data) => {
        if(data.status==="success"){
          this.router.navigateByUrl('home')
        }else{
          console.log("Something went wrong");

        }
    })
  }
}
}
