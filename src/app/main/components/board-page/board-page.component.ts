import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Board } from 'src/app/core/types/board.types';
import { HttpService } from 'src/app/core/services/http.service';
import { BoardsService } from 'src/app/shared/services/boards.service';
import { UsersService } from 'src/app/core/services/users.service';
@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  boardItems: Board[] = [];

  activeLink: string = 'boards';

  constructor(
    private httpService: HttpService,
    private boardsService: BoardsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.boardsService.boardsOnView$.subscribe((boards) => {
      this.boardItems = boards;
    });

    this.httpService
      .getUsers()
      .pipe(
        switchMap((res) => {
          if (res instanceof Array) {
            this.usersService.users$.next(res);
          }
          return this.usersService.users$;
        })
      )
      .subscribe();

    this.httpService
      .getAllBoards()
      .pipe(
        switchMap((res) => {
          if (res instanceof Array) {
            this.boardsService.boards$.next(res);
            this.boardsService.getFilterResults();
          }
          return this.boardsService.boards$;
        })
      )
      .subscribe();
  }
}
