import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-form-closed',
  templateUrl: './form-closed.component.html',
  styleUrls: ['./form-closed.component.scss']
})
export class FormClosedComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }
  goToUrl(): void {
    this.document.location.href = 'https://forms.gle/dzeELRkF3zDtJrRb7';
  }
}
