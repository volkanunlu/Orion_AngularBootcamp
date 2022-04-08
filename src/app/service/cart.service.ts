import { HttpClient } from '@angular/common/http';
import { map, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public detailItemList:any=[]
  public cartItemList:any=[]
  public productList=new BehaviorSubject<any>([])
  public search= new BehaviorSubject<string>("");
  carry=new Subject();
  
  
  
  constructor( private http: HttpClient) { }   //ürünleri çektiğimiz 
  getProducts(){
    return this.productList.asObservable();

  }

  setProduct(product:any){
    this.cartItemList.push(...product);
    this.detailItemList.push(...product);
    this.productList.next(product);

  }

  addtoDetail(product:any){   //ürün detayı şçin gerekli olan kodlarımız
    this.detailItemList.push(product);
    this.productList.next(this.detailItemList);
    console.log(this.detailItemList);


  }

  addtoCart(product : any){   //ürünü sepete eklemek için gerekli olan kodlarımız
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);

  }

  getTotalPrice():number{   //sepet toplamını yazmamızı sağlayan bloklar
    let grandTotal=0;
    this.cartItemList.map((a:any)=>{
      grandTotal+= a.total;
    })
    return grandTotal;
  }
  removeCartItem(product:any){        //sepetten ürün kaldırma işlemi
    console.log(this.cartItemList.indexOf(product));
    const newIndex=this.cartItemList.indexOf(product);

    this.cartItemList.splice(newIndex,1);
  
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){        //ürünleri tümüyle kaldırma işlemi
    this.cartItemList=[]
    this.productList.next(this.cartItemList);
  }

  order(id:any,products:any){   //sipariş işlemi tamamlandığında json tarafına göndermemizi sağlayan kod blokları.
    const order={
      userid: id,
      note: "Siparişiniz alındı.",
      products: products
    }
    console.log(products);
    console.log(id);
    this.http.post("http://localhost:3000/ordercomplete",order).subscribe(res=>{
    this.removeAllCart();
      })

  }
}
