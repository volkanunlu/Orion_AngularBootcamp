import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormBuilder,FormGroup,Validators} from "@angular/forms"
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.scss']
})
export class AdminloginComponent implements OnInit {

  public adminloginForm!: FormGroup

  constructor(private formbuilder: FormBuilder, private http: HttpClient, private router:Router) { }

  ngOnInit(): void {

    this.adminloginForm=this.formbuilder.group({

      email:['',Validators.required],  //boş bırakılamaz validatörü dahil edildi.
      password:['',Validators.required] //boş bırakılamaz validatörü dahil edildi.
    })
  }
  adminlogin(){
    this.http.get<any>("http://localhost:3000/adminarea").subscribe(res=>{   //localhosttaki adminarea bölümünde admin kontrolü sağlamak için subscribe ettik.
      const user= res.find((a:any)=>{
        return a.email === this.adminloginForm.value.email && a.password === this.adminloginForm.value.password  //girilen değerleri adminarea bölümü ile karşılaştırma bölümü.
      });  
      if(user){  

        localStorage.setItem("user",JSON.stringify(user));   //localstoragea girilen input stringe dönüştürülüp aktarılıyor.
        alert("Login Success!");
        this.adminloginForm.reset();
        this.router.navigate(['product-add'])  //ürün ekleme sayfasına yönlendirdik.
      }else {
        alert("You have entered incorrectly.Please try again!"); //hatalı giriş sonrası ekrana mesajımızı bastırdık.
        this.adminloginForm.reset();   //formumuzu resetledik.

      }

    },err=>{
      alert("Something is wrong :( ")  //Json server bağlantımız çalışmadığı anda ekrana bastırılacak olan mesajımız.
    })


  }




}