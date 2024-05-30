import { Component } from '@angular/core';
import {WeeklyNovelComponent} from "../../Components/dashboard/weekly-novel/weekly-novel.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    WeeklyNovelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
