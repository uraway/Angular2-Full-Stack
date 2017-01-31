import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { Http } from '@angular/http';
import { DataService } from '../services/data.service';

import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  templateUrl: './quizes.component.html'
})

export class QuizesComponent implements OnInit {
  quizes: any = [];
  quiz: any = {};

  isLoading = true;
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private dataService: DataService,
    public toast: ToastComponent
  ) {}

  ngOnInit(): void {
    this.getQuizes();
  }

  getQuizes() {
    this.dataService.getQuizes().subscribe(
      data => this.quizes = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(quiz: any) {
    this.isEditing = true;
    this.quiz = quiz;
  }

  cancelEditing() {
    this.isEditing = false;
    this.quiz = {};
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cats to reset the editing
    this.getQuizes();
  }

  editQuiz(quiz: any) {
    this.dataService.editQuiz(quiz).subscribe(
      res => {
        this.isEditing = false;
        this.quiz = quiz;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteQuiz(quiz: any) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.dataService.deleteQuiz(quiz).subscribe(
        res => {
          let pos = this.quizes.map(elem => { return elem._id; }).indexOf(quiz._id);
          this.quizes.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}
