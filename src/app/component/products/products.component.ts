import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { resetFakeAsyncZone } from '@angular/core/testing';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  allproducts:string="assets/images/products.png";
  electronic:string="assets/images/electronic.png";
  jewelry:string="assets/images/jewelry.png";
  personalcare:string="assets/images/personalcare.png";


  public productList : any;
  public filterCategory: any;
  searchKey:string="";
  listorcard:boolean=true;


  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProduct().subscribe(res=>{
      this.productList=res;
      this.filterCategory=res;

      this.productList.forEach((a:any) =>{

        if(a.category==="women's clothing" || a.category==="men's clothing")
        {
          a.category="fashion"   //Dışardan aldığımız ürün verilerinde kategori birleştirme sağladık.
        }
        Object.assign(a,{ quantity:1, total:a.price});
        // console.log(a);
      });
    });
    this.cartService.search.subscribe((val:any)=>{
     this.searchKey=val; 
    });
  }


  


  addtodetail(item:any){
    this.cartService.addtoDetail(item);
    this.cartService.carry.next(item);
    console.log(item);

  }


  addtocart(item:any){
    this.cartService.addtoCart(item);  //ürün ekleme 
  }
  filter(category:string){
    this.filterCategory=this.productList.filter((a:any)=>{
      if(a.category==category || category=='')                   //ürün filtreleme işlemi
      {
        return a;
      }                          
    })

  }


  toggle(){
    this.listorcard=!this.listorcard; //true-false olayı click eventinde düzeni değiştiri bu metoda bağlayarak görünüm sağladık.


  }


  changeCategory(event: any) {
    this.filter(event.target.value);    //kategori değiştirme olayı.


  }}
