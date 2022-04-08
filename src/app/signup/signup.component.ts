import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !: FormGroup;


  constructor(private formbuilder:FormBuilder, private http: HttpClient, private route: Router) { }

  ngOnInit(): void {

    this.signupForm=this.formbuilder.group({

      fullname:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      mobile:['',Validators.required]

      //formbuilder ile çekmek adına signupformdan gereken alanlar alındı.
      //Validators.required ile validasyon kontrolü yapıldı.
    })

  }

  signUp(){
      const user={
                                                              
        fullname:this.signupForm.get('fullname').value,
        email:this.signupForm.get('email').value,
        password:this.signupForm.get('password').value,
        mobile:this.signupForm.get('mobile').value,

        //Her yeni kayıtta signup metodunda kullanıcılara bir adet jwt token ekliyoruz.
        jwt: '06rasdadasdaaldsfknmasiüwnjoımpokfölpsdşçslögpmspadşsaşlmsknfbuqaıowıpe15462165456asdafkjlsndam'
      };
    //veriler json-serverdan belirtilen dizilden çekildi.
    this.http.post<any>("http://localhost:3000/signupUsers",user).subscribe(res=>{
      alert("Kayıt başarılı!"); //ekrana mesaj bastırıldı.
      this.signupForm.reset(); //kayıt sonrası form resetlendi.
      this.route.navigate(['login']); //router sayesinde logine yönlendirme yapıldı.
    }
    ,err=>{
      alert("Bir şeyler ters gitti :( "); //json server çalışmadığında ekrana bastırılan hata mesajı.
    });

  }

}
