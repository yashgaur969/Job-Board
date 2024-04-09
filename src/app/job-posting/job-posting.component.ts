import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrl: './job-posting.component.css',
})
export class JobPostingComponent implements OnInit {
  @Input() item: any;
  time: any;

  ngOnInit(): void {
    this.time = new Date(this.item.time * 1000).toLocaleString();
  }
}
