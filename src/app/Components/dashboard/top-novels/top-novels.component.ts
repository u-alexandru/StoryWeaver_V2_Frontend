import {Component} from '@angular/core';
import {MatDivider} from "@angular/material/divider";
import {MatRipple} from "@angular/material/core";

@Component({
  selector: 'app-top-novels',
  standalone: true,
  imports: [
    MatDivider,
    MatRipple
  ],
  templateUrl: './top-novels.component.html',
  styleUrl: './top-novels.component.css'
})
export class TopNovelsComponent {

}
