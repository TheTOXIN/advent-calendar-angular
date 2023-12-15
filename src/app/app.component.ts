import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {Sticker} from "./sticker/Sticker";
import {StickerComponent} from "./sticker/sticker.component";
import {Videos} from "./Videos";
import {SnowComponent} from "./snow/snow.component";
import {Data} from "./Data";
import {CounterComponent} from "./counter/counter.component";

//TODO БРАТЬ ДАТУ ИЗ СЕРВЕРА ЧТОБЫ НЕ ХАКНУЛИ
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, StickerComponent, SnowComponent, CounterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {

  private static DAYS_COUNT: number = 24;
  private static DAYS_COUNT_MONTHS: number = 31;

  @ViewChildren('stickers') components?: QueryList<StickerComponent>;

  title = '🎄🎅🏼НОВОГОДНИЙ ПУКИШ КАЛЕНДАРЬ💩💨';
  shakeAnim = false;

  isLoaded = false;
  isCounter = false;

  stickers: Sticker[] = []
  stickersOpened: number[] = [];

  loadCounter = 0;
  newYearCounter = '...';

  loadTextAll: string[] = []
  loadText: string = '';

  readonly daysCount = AppComponent.DAYS_COUNT;
  readonly decemberMonth = 12;

  ngAfterViewInit(): void {

  }

  constructor(private router: Router) {
    let date = new Date();

    if (date.getMonth() <= 0 && date.getDate() <= 1) {
      this.showCounter();
      return;
    }

    let nextYear = date.getFullYear() + 1;
    let endDate: any = new Date(nextYear, 0, 1, 0, 0, 0, 0);
    let timer = (endDate as any) - (date as any);
    let daysLeft = Math.floor(timer / (1000 * 60 * 60 * 24));

    this.newYearCounter = 'до ' + nextYear + 'г ' + daysLeft + 'д';

    this.loadTextAll = Data.loadText;
    this.loadText = this.loadTextAll[Math.floor(Math.random() * this.loadTextAll.length)];

    this.initStickers();
  }

  private initStickers() {
    for (let i = 0; i < AppComponent.DAYS_COUNT; i++) {
      let dayNumber: number = i + 1;

      let videoUrl = Videos.videosLinks[i];

      if (videoUrl.length == 0) {
        videoUrl = Videos.videoDefault;
      }

      let dayStick = AppComponent.DAYS_COUNT_MONTHS - (AppComponent.DAYS_COUNT - dayNumber);
      let stickLocked = dayStick > new Date().getDate() && new Date().getMonth() == this.decemberMonth - 1;

      if (stickLocked) {
        videoUrl = "";
      }

      let backColor1 = stickLocked ? '#797979' : this.getRandomColor();
      let backColor2 = stickLocked ? '#333333' : this.getRandomColor();

      let sticker = new Sticker(
        dayNumber,
        '' + dayStick,
        'linear-gradient(-45deg, ' + backColor1 + ', ' + backColor2 + ' )',
        videoUrl,
        stickLocked
      );

      this.stickers.push(sticker);

      if (!stickLocked) {
        this.stickersOpened.push(i);
      }
    }
  }

  loadTrigger(event: any) {
    this.loadCounter++;
    if (this.loadCounter >= AppComponent.DAYS_COUNT) {
      setTimeout(() => this.isLoaded = true, 1000)
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

    this.shakeAnim = true;
    setTimeout(() => this.shakeAnim = false, 500);

    let randOpened = Math.floor(Math.random() * this.stickersOpened.length);

    let stickIndex = this.stickersOpened[randOpened];
    let stick = this.components?.toArray()[stickIndex];

    stick?.peelOff();
    stick?.playVideo();

    this.stickersOpened.splice(randOpened, 1)
  }

  showCounter() {
    this.isCounter = true;
    this.router.navigate(["/counter"]);
  }

  toAuthor() {
    window.open("https://t.me/toxin_studio", "_blank");
  }
}
