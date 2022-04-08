import { ApiService } from 'src/app/service/api.service';
import { map } from 'rxjs/operators';
import { CartService } from '../service/cart.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public products: any=[];



  constructor(private api:ApiService , private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.getProducts().subscribe(res=>{   //ürünlerimizi çektik ve ekrana bastırıyoruz.
    this.products=res;
    console.log(this.products);
     })


  
  }





}
