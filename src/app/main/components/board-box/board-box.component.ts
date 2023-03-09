import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/core/types/board.types';

@Component({
  selector: 'app-board-box',
  templateUrl: './board-box.component.html',
  styleUrls: ['./board-box.component.scss'],
})
export class BoardBoxComponent {
  @Input() boardData!: Board;

  constructor(
    private router: Router,
  ) {}

  navigate(): void {
    this.router.navigate(['board', this.boardData._id]);
  }

  delete($event: Event): void {
    $event.stopPropagation();
  }
}
