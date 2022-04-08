import { ApiService } from 'src/app/service/api.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {


  constructor(private formbuilder:FormBuilder,private router:Router) { }

  ngOnInit(): void {

  }
  logout(){
    localStorage.clear();   //logout işlemi sonrası localstorage alanında bulunan verileri temizledik.Böylece temel olarak guardlarımızı bug durumundan kurtatıp başka commentler arası geçişleri engellemiş olduk.


  }



}





