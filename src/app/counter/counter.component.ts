import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {

  isNewYear = false;
  timerText = '';
  nextYear: number = 0;

  constructor() {
    this.nextYear = new Date().getFullYear() + 1;

    setInterval(() => {
      let date: any = new Date();
      let endDate: any = new Date(this.nextYear, 0, 1, 0, 0, 0, 0);

      if (date.getMonth() <= 0 && date.getDate() <= 1) {
        this.isNewYear = true;
        return;
      }

      let t = endDate - date;

      let seconds = Math.floor((t / 1000) % 60);
      let minutes = Math.floor((t / 1000 / 60) % 60);
      let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      let days = Math.floor(t / (1000 * 60 * 60 * 24));

      this.timerText = days + 'д ' + hours + 'ч ' + minutes + 'м ' + seconds + 'с ';
    }, 100);
  }
}
