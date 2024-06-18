import { Component } from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatRipple} from "@angular/material/core";

@Component({
  selector: 'app-weekly-novel',
  standalone: true,
  imports: [
    MatDivider,
    MatRipple
  ],
  templateUrl: './weekly-novel.component.html',
  styleUrl: './weekly-novel.component.css'
})
export class WeeklyNovelComponent {

}
