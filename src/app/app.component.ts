import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AsyncPipe} from "@angular/common";
import {injectQuery} from "@ngneat/query";

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled';
  #http = inject(HttpClient)
  #query = injectQuery()
  todosQuery$ = this.#query({
    queryKey: ['todos'],
    queryFn: () => this.fetchComments()
  }).result$

  private fetchComments() {
    return this.#http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
  }
}
