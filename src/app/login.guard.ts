import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user=localStorage.getItem("user");

      if(user){
        
      return true;
                            //Guard tanımlamamızı yaptık.user varsa diğer componentlere erişim sağlayacağız.
                            //User yoksa daimi olarak login ekranı bizi karşılayacak.

      }else{

        
        this.router.navigate(['/login']);
        return false;

      }

  }
  
}
