import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board } from 'src/app/core/types/board.types';
import { UsersService } from 'src/app/core/services/users.service';
import { HttpService } from 'src/app/core/services/http.service';
import { map, take } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);

  boardsOnView$: BehaviorSubject<Board[]> = new BehaviorSubject<Board[]>([]);
  // titles: string[];

  titleFilter: string = '';
  title: string = '';
  owner: string = '';

  randomArr: number[] = [];

  users: string[] = [];

  constructor(
    private usersService: UsersService,
    private httpService: HttpService
  ) {}

  addBoard(board: Board): void {
    console.log(this.boards$);
    const boards = this.boards$.getValue();
    console.log(boards);
    boards.push(board);
    this.boards$.next(boards);
    this.getFilterResults();
    this.getFilterResultsTitle();
  }

  deleteBoard(id: string): void {
    const boards = this.boards$.getValue();
    this.boards$.next(boards.filter((board) => board._id !== id));
    this.getFilterResults();
    this.getFilterResultsTitle();
  }

  getName(boardId: string): string {
    return (
      this.boards$.getValue().find((board) => board._id === boardId)?.title ||
      'DELETED_BOARD'
    );
  }
  ///////////////

  hasBoard(boardId: string): boolean {
    return !!this.boards$.getValue().find((board) => board._id === boardId);
  }
  ///////////////////
  // getArrOfTitles() {
  //   this.httpService
  //     .getAllBoards()
  //     .pipe(map((boards) => console.log(boards)))
  //     .subscribe((titles) => {
  //       titles = titles;
  //     });
  // }

  //     .subscribe((boards) => boards.map(() =>
  //     boards.title
  //  );

  ////////////////////
  getFilterResults(): void {
    console.log(this.boards$.getValue());
    this.boardsOnView$.next(this.filterResults(this.boards$.getValue()));
  }

  private filterResults(boards: Board[]): Board[] {
    console.log(boards);
    return boards
      .filter((board) => this.isIncludedTitle(board))
      .filter((board) => this.isIncludedUser(board));
    // boards.filter((board) => this.isIncludedTitle(board))
  }
  getFilterResultsTitle(): void {
    console.log(this.boards$.getValue());
    this.boardsOnView$.next(this.filterResultsTitle(this.boards$.getValue()));
  }
  private filterResultsTitle(boards: Board[]): Board[] {
    console.log(boards);
    return (
      // boards
      // .filter((board) => this.isIncludedTitle(board))
      // .filter((board) => this.isIncludedUser(board)) ||
      boards.filter((board) => this.isIncludedTitle(board))
    );
  }

  private isIncludedTitle(board: Board): boolean {
    return this.title ? board.title.toLowerCase().includes(this.title) : true;
  }

  private isIncludedUser(board: Board): boolean {
    // if (this.owner === 'DELETED_USER') {
    //   return this.usersService.isDeletedUser(board.owner);
    // }
    // console.log(this.owner);
    return this.owner ? board.owner === this.owner : true;
  }

  private setRandomArr(range: number): void {
    this.randomArr = new Array(range)
      .fill(null)
      .map((_el, i) => i)
      .sort(() => Math.random() - 0.5);
  }
}
