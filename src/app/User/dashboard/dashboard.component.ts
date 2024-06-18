import {Component} from '@angular/core';
import {WeeklyNovelComponent} from "../../Components/dashboard/weekly-novel/weekly-novel.component";
import {TopNovelsComponent} from "../../Components/dashboard/top-novels/top-novels.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    WeeklyNovelComponent,
    TopNovelsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
