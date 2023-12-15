import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
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

  @ViewChild("videoPlayer", {static: false}) videoPlayer: any;

  public peeled = false
  public played = false;

  public fullScreen = false;
  public animatePeel = "";

  constructor() {

  }

  ngAfterViewInit(): void {
    this.videoPlayer?.nativeElement.addEventListener("ended", () => {
      this.played = false;
      this.fullScreen = false;
    });

    this.videoPlayer?.nativeElement.addEventListener("pause", () => this.played = false);
    this.videoPlayer?.nativeElement.addEventListener("play", () => this.played = true);

    this.videoPlayer?.nativeElement.addEventListener('loadeddata', () => this.loadEvent.emit());

    if (this.sticker.videoSrc.length == 0) {
      this.loadEvent.emit();
    }
  }

  loadVideo() {
    this.videoPlayer?.nativeElement.load();
  }

  showSticker() {
    this.peelOff();
    this.toggleVideo();
  }

  peelOff() {
    if (this.peeled || this.sticker.locked) {
      return;
    }

    this.peeled = !this.peeled
    this.animatePeel = this.getRandomAnimatePeel();
  }

  toggleVideo() {
    if (!this.peeled) {
      return;
    }

    if (this.played) {
      this.fullScreen = !this.fullScreen;
    } else {
      this.playVideo();
    }
  }

  playVideo() {
    if (this.played) {
      this.videoPlayer.nativeElement.currentTime = 0;
    }

    this.videoPlayer?.nativeElement.play();
    this.played = true;
  }

  getRandomAnimatePeel() {
    return Animate.animationPeel[Math.floor(Math.random() * Animate.animationPeel.length)];
  }
}
