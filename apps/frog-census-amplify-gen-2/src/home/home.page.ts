import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
})
export class HomePageComponent implements OnInit {
  ngOnInit(): void {
    console.log('Hello, World!');
  }
}
