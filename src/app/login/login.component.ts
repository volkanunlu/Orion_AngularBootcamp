import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from "@angular/forms"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public loginForm!: FormGroup

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {

    this.loginForm=this.formbuilder.group({

      email:['',Validators.required],  //boş bırakılamaz validatörü dahil edildi.
      password:['',Validators.required] //boş bırakılamaz validatörü dahil edildi.
    })
  }

  login(){
    this.http.get<any>("http://localhost:3000/signupUsers").subscribe(res=>{ //localhosttaki signup bölümünde userların kontrolü sağlamak için subscribe ettik
      const user= res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password   //girilen değerleri signupusers bölümü ile karşılaştırma bölümü.
      });
      if(user){

        localStorage.setItem("user",JSON.stringify(user));   //localstoragea girilen input stringe dönüştürülüp aktarılıyor
        alert("Login Success!");    //ekrana mesajımızı bastırdık.
        this.loginForm.reset();                           //işlem sonrası formumuzu resetledik.
        this.router.navigate(['products'])                //yönlendirme işlemimizi yaptık.
      }else {
        alert("You have entered incorrectly.Please try again!");  //ekrana hata mesajımızı bastık.
        this.loginForm.reset();                                  //işlem sonrası formumuz resetlendi.

      }

    },err=>{
      alert("Something is wrong :( ")    //Olası json bağlantısı yüklenmediyse ekrana basılacak hatamız.(json-server --watch db.json çalıştırılmadı ise)
    })


  }

}
