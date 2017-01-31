import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import { DataService } from '../services/data.service';

import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent {
  score = localStorage.getItem('score');
  user: any = {};
  users: any = [];

  addUserForm: FormGroup;
  name = new FormControl('', Validators.required);

  constructor(
    private location: Location,
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) {}

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: this.name,
      score: this.score
    });
  }

  addUser() {
    this.dataService.addUser(this.addUserForm.value).subscribe(
      res => {
        let newUser = res.json();
        this.users.push(newUser);
        this.addUserForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
        this.router.navigate(['dashboard']);
      },
      error => console.log(error)
    );
  }
}
