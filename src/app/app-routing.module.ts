import { ProductAddComponent } from './product-add/product-add.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DetailComponent } from './detail/detail.component';
import { HeaderComponent } from './component/header/header.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductsComponent } from './component/products/products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './login.guard';
const routes: Routes = [

 {path:'', redirectTo:'login', pathMatch:'full'},  //ana olarak localde 4200'e yönlendirdik.
 {path: 'login', component:LoginComponent},
 {path:'signup', component:SignupComponent},
 {path:'products',component:ProductsComponent, canActivate:[LoginGuard]}, //Guardlarımız sayesinde  products componentine giriş kısıtlaması koyduk.
 {path:'cart' , component:CartComponent, canActivate:[LoginGuard]},       //Guardlarımız sayesinde  cart componentine giriş kısıtlaması koyduk.
 {path:'header', component:HeaderComponent, canActivate:[LoginGuard]},    //Guardlarımız sayesinde  header componentine giriş kısıtlaması koyduk.
 {path:'detail', component:DetailComponent, canActivate:[LoginGuard]},    //Guardlarımız sayesinde  detail componentine giriş kısıtlaması koyduk.
 {path:'adminlogin', component:AdminloginComponent},
 {path:'product-add', component:ProductAddComponent, canActivate:[LoginGuard]} //Guardlarımız sayesinde  product-add componentine giriş kısıtlaması koyduk.

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
