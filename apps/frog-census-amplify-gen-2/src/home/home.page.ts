import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Schema } from '../../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

type Report = Schema['report']['type'];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
})
export class HomePageComponent implements OnInit {
  ngOnInit(): void {
    this.listReports();
  }

  listReports() {
    try {
      client.models.report.observeQuery().subscribe({
        next: ({ items, isSynced }) => {
          console.log('reports:', items);
          console.log('isSynced:', isSynced);
        },
      });
    } catch (error) {
      console.error('error subscribing to reports', error);
    }
  }
}
