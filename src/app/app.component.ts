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
        this.getTextColor(this.blendColors(backColor1, backColor2)),
        ''
      ));

      this.stickersOpened.push(i);
    }
  }

  getRandomColor() {
    var color: string = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  getTextColor(bgColor: string) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;

    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB

    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 127.5) ? '#000000' : '#FFFFFF';
  }

  blendColors(colorA: any, colorB: any) {
    const amount = 0.5
    const [rA, gA, bA] = colorA.match(/\w\w/g).map((c: any) => parseInt(c, 16));
    const [rB, gB, bB] = colorB.match(/\w\w/g).map((c: any) => parseInt(c, 16));
    const r = Math.round(rA + (rB - rA) * amount).toString(16).padStart(2, '0');
    const g = Math.round(gA + (gB - gA) * amount).toString(16).padStart(2, '0');
    const b = Math.round(bA + (bB - bA) * amount).toString(16).padStart(2, '0');
    return '#' + r + g + b;
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
