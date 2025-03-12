import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { generateClient } from 'aws-amplify/api';
// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Schema } from '../../../../../amplify/data/resource';
import { CommonModule } from '@angular/common';

const client = generateClient<Schema>();

type Report = Schema['report'];

@Component({
  standalone: true,
  selector: 'app-expert-review-list',
  templateUrl: './expert-review-list.page.html',
  styleUrls: ['./expert-review-list.page.scss'],
  imports: [CommonModule, ButtonModule, TableModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpertReviewListComponent implements OnInit {

  reports: Report[] = [];

  ngOnInit(): void {
    this.listReports();
  }

  async listReports() {
    const { data: reports } = await client.models.report.list();
    this.reports = reports as unknown as Report[];
    console.log('reports $$', this.reports);
  }
}
