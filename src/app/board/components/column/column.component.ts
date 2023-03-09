import { Component } from '@angular/core';
import { Column } from 'src/app/core/types/column.types';
import {
  ChangeDetectorRef,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/core/services/http.service';
import { BoardService } from '../../services/board.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() columnData!: Column;

  @Input() columnsIds!: string[];

  @Input() boardId!: string;

  @ViewChild('titleInput') titleInputEl!: ElementRef<HTMLElement>;

  data: string[] = [];

  titleControl = new FormControl();

  isEditableTitle: boolean = false;

  isTitleUpdatingProgress: boolean = false;

  public isCreateVisible: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private boardService: BoardService,
    private changeDetector: ChangeDetectorRef,
    private renderer: Renderer2,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.boardId = params['id'];
    });

    this.titleControl.setValidators(Validators.required);
  }

  deleteColumn(): void {}

  showInput(): void {
    this.isEditableTitle = true;
    this.changeDetector.detectChanges();
    this.titleControl.setValue(this.columnData.title);
  }

  updateTitle(): void {
    this.isTitleUpdatingProgress = true;
    this.titleControl.disable();
    this.httpService
      .updateColumn(this.boardId, this.columnData._id, {
        order: this.columnData.order,
        title: this.titleControl.value,
      })
      .subscribe({
        next: (newCol) => {
          if ('_id' in newCol) {
            this.boardService.updateColumnTitle(
              this.columnData.order,
              newCol.title
            );
          }
        },
        complete: () => {
          this.isEditableTitle = false;
          this.isTitleUpdatingProgress = false;
          this.titleControl.enable();
        },
      });
  }

  hideInput(): void {
    this.isEditableTitle = false;
  }

  public closeModal(): void {
    this.isCreateVisible = false;
  }
}
