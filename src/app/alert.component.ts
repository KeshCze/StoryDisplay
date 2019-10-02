import { Component, Input, EventEmitter, Output } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: "alert",
  template: `
    <section [@fadeInOut]>
     <h1 (click)="output.next('output')">Id: {{ID}}</h1>
    <section>
  `,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate(500, style({ opacity: 0 }))
      ])
    ])
  ],
})
export class AlertComponent {
  @Input() ID: string;
  @Output() output = new EventEmitter();
}
