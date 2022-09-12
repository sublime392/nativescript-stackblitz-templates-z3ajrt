import { Component, OnInit, ViewChild } from '@angular/core';
import { Application, CoreTypes, Screen } from '@nativescript/core';

@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  @ViewChild('cameraOverlay', { static: false }) public cameraOverlay?: any;

  public currentOrientation = 'portrait';

  constructor() {
    Application.on(
      Application.orientationChangedEvent,
      this.handleOrientationChange,
      this
    );
  }

  handleOrientationChange(args) {
    console.log('ORIENTATION1:', Application.orientation());
    setTimeout(() => {
      this.currentOrientation = Application.orientation();
      if (this.currentOrientation === 'portrait') {
        this.cameraOverlay.nativeElement.animate({
          rotate: 90,
          duration: 200,
          curve: CoreTypes.AnimationCurve.easeIn,
        });
      } else {
        this.cameraOverlay.nativeElement.animate({
          rotate: 0,
          duration: 200,
          curve: CoreTypes.AnimationCurve.easeIn,
        });
      }
    }, 1000);

    setTimeout(() => {
      const deviceWidth = Screen.mainScreen.widthDIPs;
      const deviceHeight = Screen.mainScreen.heightDIPs;

      // this.widthDIPs = Math.max(Screen.mainScreen.widthDIPs, Screen.mainScreen.heightDIPs);
      this.cameraOverlay.nativeElement.height = Math.max(
        Screen.mainScreen.widthDIPs,
        Screen.mainScreen.heightDIPs
      );
      this.cameraOverlay.nativeElement.width = Math.max(
        Screen.mainScreen.widthDIPs,
        Screen.mainScreen.heightDIPs
      );
      this.cameraOverlay.height = Math.max(
        Screen.mainScreen.widthDIPs,
        Screen.mainScreen.heightDIPs
      );
      this.cameraOverlay.width = Math.max(
        Screen.mainScreen.widthDIPs,
        Screen.mainScreen.heightDIPs
      );
    }, 2000);
    setTimeout(() => {
      this.cameraOverlay?.nativeElement.requestLayout();
    }, 3000);
  }

  ngOnInit(): void {}
}
