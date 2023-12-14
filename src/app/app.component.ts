import {Component, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {Sticker} from "./sticker/Sticker";
import {StickerComponent} from "./sticker/sticker.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, StickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  private static DAYS_COUNT: number = 24;
  private static DAYS_COUNT_MONTHS: number = 31;

  @ViewChildren('stickers') components?: QueryList<StickerComponent>;

  title = '🎄🎅🏼НОВОГОДНИЙ ПУКИШ КАЛЕНДАРЬ💩💨';
  year = new Date().getFullYear();

  stickers: Sticker[] = []
  stickersOpened: number[] = [];

  constructor() {
    for (let i = 0; i < AppComponent.DAYS_COUNT; i++) {
      let dayNumber: number = i + 1;

      let backColor1 = this.getRandomColor();
      let backColor2 = this.getRandomColor();

      this.stickers.push(new Sticker(
        dayNumber,
        'ДЕНЬ ' + (AppComponent.DAYS_COUNT_MONTHS - (AppComponent.DAYS_COUNT - dayNumber)),
        'linear-gradient(-45deg, ' + backColor1 + ', ' + backColor2 + ' )',
        'assets/advent_video_16.webm'
      ));

      this.stickersOpened.push(i);
    }
  }

  getRandomColor() {
    var color: string = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  randomStick() {
    if (this.stickersOpened.length == 0) {
      return
    }

    let randOpened = Math.floor(Math.random() * this.stickersOpened.length);

    let stickIndex = this.stickersOpened[randOpened];
    let stick = this.components?.toArray()[stickIndex];

    stick?.peelOff();
    stick?.toggleVideo();

    this.stickersOpened.splice(randOpened, 1)
  }
}
