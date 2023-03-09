import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { User } from '../../types/users.types';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Board } from '../../types/board.types';
import { map, Observable, switchMap } from 'rxjs';

interface Translate {
  part1: string;
  part2: string;
}

@Component({
  selector: 'app-board-add-form',
  templateUrl: './board-add-form.component.html',
  styleUrls: ['./board-add-form.component.scss'],
})
export class BoardAddFormComponent implements OnInit {
  appUsers: User[] = [];

  selectedUsers: User[] = [];

  private message: string = 'test';

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private boardsService: BoardsService,
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  boardForm: FormGroup = this.formBuilder.group({
    title: ['', [Validators.required]],
    users: [[]],
  });

  ngOnInit(): void {
    this.usersService.users$.subscribe((users) => {
      this.appUsers = users;
    });
  }

  createBoard(): void {
    const board = {
      title: this.boardForm.get('title')?.value as string,
      owner: localStorage.getItem('userId') || '',
      users: (this.boardForm.get('users')?.value as string[]) || [],
    };
    this.httpService
      .createBoard(board)
      .pipe(
        switchMap((res) =>
          this.getMessage().pipe(
            map((translate) => {
              return {
                res: res,
                translate: translate,
              };
            })
          )
        )
      )
      .subscribe((res) => {
        if ((res.res as Board)._id) {
          this.snackBar.open(
            `${res.translate.part1} '${this.boardForm.get('title')?.value}' ${
              res.translate.part2
            }`,
            'OK',
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          this.boardForm.reset();
          this.boardsService.addBoard(res.res as Board);
          this.message = '';
        }
      });
  }

  getFirstUser(): string {
    return this.usersService.getName(this.boardForm.get('users')?.value?.[0]);
  }

  private getMessage(): Observable<Translate> {
    return this.translate.getTranslation(this.translate.currentLang).pipe(
      map((translateObj) => {
        return {
          part1: translateObj.mainPage.messagePart1,
          part2: translateObj.mainPage.messagePart2,
        };
      })
    );
  }
}
