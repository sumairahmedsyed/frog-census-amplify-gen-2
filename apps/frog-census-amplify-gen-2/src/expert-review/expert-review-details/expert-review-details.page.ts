import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-expert-review-details',
  templateUrl: './expert-review-details.page.html',
  styleUrls: ['./expert-review-details.page.scss'],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpertReviewDetailsComponent implements OnInit {
  ngOnInit(): void {
    console.log('ExportReviewDetailsComponent initialized');
  }
}
