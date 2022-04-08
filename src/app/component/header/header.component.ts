import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  public totalItem : number=0;
  public searchTerm:string='';
  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.getProducts().subscribe(res=>{
      this.totalItem=res.length;
      
    })

  }
  search(event:any){
    this.searchTerm=(event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);    //inputu event ile dinlediğimiz arama çubuğumuzun dinamik yapısını oluşturduğumuz bölüm.
    

  }

  logout(){

    localStorage.removeItem("user");  //çıkış sonrası local storage tarafında kullanıcı bilgilerini kaldırdığımız bölüm.
    //Sebep? --> Bu işlem gerçekleşmediğinde bug durumu gerçekleşiyor, localstorage hala o verileri tuttuğu için guardlar tetiklenemiyor.Diğer bölümlere kullanıcı herhangi bir şifre girmeden erişebiliyor.
  }

}
