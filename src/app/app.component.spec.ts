import { AppComponent } from './app.component'
import { render, screen, within } from '@testing-library/angular'
import { Todo } from './types'
import { Observable, of } from 'rxjs'
import { ApiService } from './api.service'

describe('AppComponent', () => {
  const todos: Todo[] = [
    { completed: false, id: 0, title: 'First', userId: 0 },
    { completed: false, id: 1, title: 'Second', userId: 0 },
    { completed: true, id: 2, title: 'Third', userId: 0 },
  ]

  it('renders component', async () => {
    fetchComments.mockReturnValue(of(todos))

    await renderComponent()

    const title = screen.getByRole('heading')
    expect(title).toHaveTextContent('Hello, Todos!')
    const list = await screen.findByRole('list')
    const items = await within(list).findAllByRole('listitem')
    expect(items).toHaveLength(todos.length)
    expect(items[0]).toHaveTextContent('First')
    expect(items[1]).toHaveTextContent('Second')
    expect(items[2]).toHaveTextContent('Third')
  })
})

const fetchComments = jest.fn<Observable<Todo[]>, any>()

function renderComponent() {
  return render(AppComponent, {
    providers: [{ provide: ApiService, useValue: { fetchComments } }],
  })
}
