import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';
import { DataService } from '../services/data.service';

@Component({
  templateUrl: './add-quiz.component.html'
})

export class AddQuizComponent {
  quiz: any = {};
  quizes: any = [];

  addQuizForm: FormGroup;
  text = new FormControl('', Validators.required);
  value = new FormControl(0, Validators.required);

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent
  ) {}

  ngOnInit(): void {
    this.addQuizForm = this.formBuilder.group({
      text: this.text,
      value: this.value
    });
  }

  addQuiz() {
    this.dataService.addQuiz(this.addQuizForm.value).subscribe(
      res => {
        let newQuiz = res.json();
        this.quizes.push(newQuiz);
        this.addQuizForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }
}
