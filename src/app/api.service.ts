import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Todo } from './types'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  #http = inject(HttpClient)

  fetchComments() {
    return this.#http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
  }
}
