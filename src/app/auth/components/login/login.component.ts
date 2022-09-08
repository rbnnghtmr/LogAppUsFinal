import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLog: FormGroup = this.fb.group(
    {
      id: ['', [Validators.required, Validators.minLength(8)]],
      pass: ['',[Validators.required, Validators.minLength(7)]]
    }
  );

  constructor(private fb : FormBuilder, 
      private router: Router,
      private authservice: AuthService,
      private toastr: ToastrService) { }
  ngOnInit(): void {
  }

login()
{
  console.log(this.formularioLog.value);
  console.log(this.formularioLog.valid);

  

  if(this.formularioLog.valid)
  {
    const {id, pass} = this.formularioLog.value;
    this.authservice.login(id, pass)
    .subscribe(res => 
      {
        if(res === true)
        {
          this.router.navigateByUrl('/dashboard');
          this.toastr.success(id, 'Ingreso correcto');
        }
        else
        {
          console.log(res);
          this.toastr.error(res, 'Error', {
            timeOut: 4000,
            progressAnimation: 'increasing'
          })
        }
      })
  }
  else
  {
    this.toastr.error('Verifique sus datos', 'Error');
    
  }


}

}
