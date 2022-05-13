import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public regForm: any = FormGroup;

  SSLC = false;
  HSC = false;
  BE=false;

  educationArr:any = [];

  disabled = false;

  constructor(
    public router: Router,
    private formBuilder: FormBuilder,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.formvalidaiton();
  }

  private formvalidaiton() {
    this.regForm = this.formBuilder.group({
      name:["",Validators.required],
      email: ["",Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")],
      password: ["",Validators.required],
      phone:["",Validators.required],
      address:["",Validators.required],
      date: ['', Validators.required],
      education: [],
      gender: [],
    });
  }

  getCheckBoxValue(event:any){
    console.log(event.source.name);
    this.educationArr.push(event.source.name);
    this.regForm.patchValue({
      education: this.educationArr
    })
  }

  public onSubmit() {
    console.log("regForm.values", this.regForm.value);
    if (this.regForm.invalid) {
      console.log("invalid");
      return;
    } else {
      this.http.post<any>('http://localhost:3000/api/register',
       this.regForm.value).subscribe((data) => {
      this.router.navigateByUrl('login')
       })
    }
  }


}


