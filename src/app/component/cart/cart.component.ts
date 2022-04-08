import { FormGroup } from '@angular/forms';
import { ProductsComponent } from './../products/products.component';
import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit { 


  public products: any=[];
  public grandTotal:number;
  ordercomplete:boolean;
  emptycartimage:string="assets/images/emptycart.png"; //sepet temiz olduğunda bg olan image yolu.
  ordercartimage:string="assets/images/ordercart.png"; //sipariş tamam olduğunda bg olan image yolu.

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res=>{
      this.products=res;
      this.grandTotal=this.cartService.getTotalPrice(); 
    })
  }

  removeItem(item:any){
    this.cartService.removeCartItem(item);  //bu metodu butonla bağladık, tıklanılan ürünü carttan çıkaracak.
    
  }
  emptycart()
  {
    this.cartService.removeAllCart();  //bu metotla birlikte buton içine girdiğinde carttaki tüm ürünleri kaldırmakta.
  }

  ordercart():void
    {
      console.log(this.products); 
      this.ordercomplete=true;
      // this.cartService.removeAllCart();
      this.cartService.order(JSON.parse(localStorage.getItem("user")).id, this.products); //json tarafına siparişe ait verileri ve id gönderdiğimiz bölüm
    }


  

}
  


