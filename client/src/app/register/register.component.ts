import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(private accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  register() {
    this.accountService.register(this.model).subscribe(response => {
      this.cancel();
    }, error => {
      if (error.error.errors) {
        this.toastr.error(error.error.errors.Password[0]);
        this.toastr.error(error.error.errors.Username[0]);
      } else {
        this.toastr.error(error.error);
      }
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
