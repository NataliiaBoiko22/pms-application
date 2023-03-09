import { Component } from '@angular/core';
import { ColumnDialogComponent } from '../components/column-dialog/column-dialog.component';

import { Column } from 'src/app/core/types/column.types';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { BoardService } from '../services/board.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent {
  boardId!: string;

  columns: Column[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private boardService: BoardService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.boardId = params['id'];
    });
    this.boardService.columns.subscribe((cols) => {
      this.columns = cols;
    });

    this.getColumns();
  }

  goToMain(): void {
    this.router.navigate(['main']);
  }


  getArrOfIds(): string[] {
    return this.columns.map((col) => `CID_${col._id}`);
  }



  private getColumns(): void {
    this.httpService.getAllColumns(this.boardId).subscribe((cols) => {
      if (cols instanceof Array) {
        this.boardService.columns.next(cols.sort((a, b) => a.order - b.order));
      }
    });
  }

  openDialogColumn(): void {
    this.dialog.open(ColumnDialogComponent, {
      data: {
        boardId: this.boardId,
      },
    });
  }
}
