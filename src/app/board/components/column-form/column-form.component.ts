import { Component, Input } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { BoardService } from '../../services/board.service';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent {
  @Input() boardId!: string;

  columnForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private boardService: BoardService
  ) {}

  createColumn(): void {
    this.httpService
      .createColumn(this.boardId, {
        ...this.columnForm.value,
        order: this.boardService.getColumnLastOrder(),
      })
      .subscribe((col) => {
        if ('_id' in col) {
          this.boardService.addColumn(col);
        }
      });
  }
}
