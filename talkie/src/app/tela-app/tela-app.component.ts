import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-app',
  templateUrl: './tela-app.component.html',
  styleUrls: ['./tela-app.component.scss']
})
export class TelaAppComponent implements OnInit {

  seedValue: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  seedData(ev: string): void {
    this.seedValue = ev;
  }
}
