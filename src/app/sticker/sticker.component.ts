import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Sticker} from "./Sticker";
import {CommonModule} from '@angular/common';
import {Animate} from "../Animate";

@Component({
  selector: 'app-sticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sticker.component.html',
  styleUrl: './sticker.component.scss'
})
export class StickerComponent implements AfterViewInit {

  @Input()
  public sticker: Sticker = new Sticker(0, "", "", "", false);

  @Output() loadEvent = new EventEmitter<void>();

  @ViewChild("videoPlayer", {static: false}) videoPlayer?: ElementRef;

  public peeled = false
  public paused = true;
  public played = false;

  animatePeel = "";

  constructor() {

  }

  ngAfterViewInit(): void {
    this.videoPlayer?.nativeElement.addEventListener("ended", () => this.paused = true);
    this.videoPlayer?.nativeElement.addEventListener("pause", () => this.paused = true);

    this.videoPlayer?.nativeElement.addEventListener('loadeddata', () => this.loadEvent.emit());

    if (this.sticker.videoSrc.length == 0) {
      this.loadEvent.emit();
    }
  }

  toggleVideo() {
    this.paused = false;

    if (!this.played) {
      this.videoPlayer?.nativeElement.play();
    } else {
      this.videoPlayer?.nativeElement.requestFullscreen();
    }

    this.played = !this.played;
  }

  loadVideo() {
    this.videoPlayer?.nativeElement.load();
  }

  peelOff() {
    if (this.peeled || this.sticker.locked) {
      return;
    }

    this.peeled = !this.peeled
    this.animatePeel = this.getRandomAnimatePeel();
  }

  getRandomAnimatePeel() {
    return Animate.animationPeel[Math.floor(Math.random() * Animate.animationPeel.length)];
  }
}
