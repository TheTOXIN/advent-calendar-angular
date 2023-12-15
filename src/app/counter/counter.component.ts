import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {

  isNewYear = false;
  timerText = '...';
  nextYear: number = 0;

  constructor() {
    this.nextYear = new Date().getFullYear() + 1;

    setInterval(() => {
      if (this.isNewYear) {
        return;
      }

      let date: any = new Date();
      let endDate: any = new Date(this.nextYear, 0, 1, 0, 0, 0, 0);

      if (date.getMonth() <= 0 && date.getDate() <= 1) {
        this.newYear();
        return;
      }

      let t = endDate - date;

      let seconds = Math.floor((t / 1000) % 60);
      let minutes = Math.floor((t / 1000 / 60) % 60);
      let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      let days = Math.floor(t / (1000 * 60 * 60 * 24));

      this.timerText = days + 'д ' + hours + 'ч ' + minutes + 'м ' + seconds + 'с ';
    }, 500);
  }

  newYear() {
    this.isNewYear = true;
    setInterval(() => {
      this.shoot()
    }, 1000);
  }

  shoot() {
    confetti({
      particleCount: this.randomInRange(100, 300),
      origin: {y: 1.4},
      startVelocity: this.randomInRange(75, 100),
      gravity: this.randomInRange(0.5, 1),
      angle: this.randomInRange(50, 130),
      spread: this.randomInRange(50, 100)
    });
  }


  randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
