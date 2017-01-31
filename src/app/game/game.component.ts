import { Console } from '@angular/compiler/src/private_import_core';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  stage = 0;
  currentQuiz: any = {};
  givenQuizes: any = [];
  score = 100;
  answer = 0;
  ans = "";
  buttonDisabled = false;
  context:CanvasRenderingContext2D;

  @ViewChild("myCanvas") myCanvas: any;

  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngAfterViewInit() {
    // 参照をとれる
    let canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext("2d");
    this.balloons(100, 0);
  }

  ngOnInit(): void {
    this.getQuizes();
  }

  balloons(i: number, diff: number): void {

    var audio = new Audio();
    audio.src = "../../assets/audio/balloon.mp3";
    audio.load();

    var count = 0;
    var countup = () => {
      if (count > 0) audio.play();
      window.console.log(count++);
    }
    var id = window.setInterval(() => {
      countup();
      if (diff === 0 || diff <= count){
        window.clearInterval(id);　//idをclearIntervalで指定している
      }}, 5);

    requestAnimationFrame(() => {
      for (let l = 0; l < i; l++) {
        var ctx = this.context;
        var red = new Image();
        var blue = new Image();
        var yellow = new Image();
        var lime = new Image();
        var purple = new Image();

        ctx.beginPath();
        red.src = "../../assets/images/balloon_red.png";
        blue.src = "../../assets/images/balloon_blue.png";
        yellow.src = "../../assets/images/balloon_yellow.png";
        lime.src = "../../assets/images/balloon_lime.png";
        purple.src = "../../assets/images/balloon_purple.png";

        purple.onload = () => {
          ctx.drawImage(this.randomOfArray([red, blue, yellow, lime, purple]), this.randomXY(), this.randomXY(), 40, 60);
        }
      }
      ctx.font = "bold 120px 'ＭＳ Ｐゴシック'";
      ctx.fillStyle = "black";
      ctx.fillText(`${i}`, 170, 300);
    });
  }

  clear() {
    var ctx = this.context;
    ctx.clearRect(0, 0, 1200, 800);
  }

  randomOfArray(ary: Array<any>){
    return ary[Math.floor(Math.random() * ary.length)];
  }

  randomXY() {
    return Math.random() * 250 + 100;
  }

  ngOnDestroy(): void {
  }

  getQuizes(): void {
    this.dataService.getQuizes().subscribe(
      data => {
        this.givenQuizes = this.shuffle(data).slice(0, 5);
        this.currentQuiz = this.givenQuizes[0];
      },
      error => window.console.log(error),
    );
  }

  submit(userAnswer: number): void {
    this.buttonDisabled = true;
    this.checkAnswer(userAnswer);
  }

  next(): void {
    this.buttonDisabled = false;
    if (this.stage === 5) {
      this.finish(this.score);
    } else {
      this.stage += 1;
      this.currentQuiz = this.givenQuizes[this.stage];
      this.ans = "";
    }
  }

  checkAnswer(userAnswer: number): void {
    const correctAnswer = this.currentQuiz.value;
    const diff = Math.abs(correctAnswer - userAnswer);
    this.displayAns(`${correctAnswer}`);

    this.score -= diff;
    this.clear();
    this.balloons(this.score, diff);

    if (this.score <= 0) {
      this.finish(0);
    }
  }

  displayAns(ans: string): void {
    this.ans = ans;
  }

  finish(finalScore: number): void {
    window.setTimeout(() => {
      localStorage.setItem('score', String(finalScore));
      this.router.navigate(['result']);
    }, 2000);
  }

  shuffle(array: any) {
    let n = array.length;
    let t: any;
    let i: any;

    while(n) {
      i = Math.floor(Math.random() * n--);
      t = array[n];
      array[n] = array[i];
      array[i] = t;
    }

    return array;
  }
}
