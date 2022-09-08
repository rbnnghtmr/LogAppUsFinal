import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {



  formularioRegister: FormGroup = this.fb.group({
    usname: ['', [Validators.required, Validators.minLength(6)]],
    id: ['', [Validators.required, Validators.minLength(8)]],
    pass: ['', Validators.required, Validators.minLength(7)]
  })

  
  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  register()
  {
    const {usname, id, pass} = this.formularioRegister.value;
    this.authService.register(usname, id, pass)
    .subscribe(res => 
      {
        if(res === true)
        {
          this.router.navigateByUrl('/dashboard');
          this.toastr.success(id + " " +usname, 'Registro Correcto');
        }
        else
        {
          console.log(res);
          this.toastr.error(res, 'Error', 
          {
            timeOut: 4000,
            progressAnimation: 'increasing'
          });
        }
      });
  }


}
