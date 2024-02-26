import { Component, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { AsyncPipe } from '@angular/common'
import { injectQuery } from '@ngneat/query'
import { ApiService } from './api.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Todos'
  #api = inject(ApiService)
  #query = injectQuery()
  todosQuery$ = this.#query({
    queryKey: ['todos'],
    queryFn: () => this.#api.fetchComments(),
  }).result$
}
