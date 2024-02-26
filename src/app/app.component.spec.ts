import { AppComponent } from './app.component'
import { byRole, createComponentFactory } from '@ngneat/spectator/jest'
import { fakeAsync, flush } from '@angular/core/testing'
import { ApiService } from './api.service'
import { Observable, of } from 'rxjs'
import { Todo } from './types'

describe('AppComponent', () => {
  const fetchComments = jest.fn<Observable<Todo[]>, any>()
  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [{ provide: ApiService, useValue: { fetchComments } }],
  })

  const todos: Todo[] = [
    { completed: false, id: 0, title: 'First', userId: 0 },
    { completed: false, id: 1, title: 'Second', userId: 0 },
    { completed: true, id: 2, title: 'Third', userId: 0 },
  ]

  it('renders component', async () => {
    fetchComments.mockReturnValue(of(todos))

    const spectator = createComponent()

    // does not help! I'll get a jest timeout when enabling this
    // await spectator.fixture.whenStable()
    // neither does this help 😭
    // spectator.detectChanges()
    // spectator.detectComponentChanges()

    const title = spectator.query(byRole('heading'))
    expect(title).toHaveText('Hello, Todos!')
    const list = spectator.query(byRole('list'))
    expect(list).toExist()
    const items = spectator.queryAll(byRole('listitem'))
    expect(items).toHaveLength(todos.length)
    expect(items[0]).toHaveText('First')
    expect(items[1]).toHaveText('Second')
    expect(items[2]).toHaveText('Third')
  })

  it('renders component with fakeAsync', fakeAsync(() => {
    fetchComments.mockReturnValue(of(todos))

    const spectator = createComponent()
    // if I leave this out, the list won't be rendered
    spectator.tick()

    const title = spectator.query(byRole('heading'))
    expect(title).toHaveText('Hello, Todos!')
    const list = spectator.query(byRole('list'))
    expect(list).toExist()
    const items = spectator.queryAll(byRole('listitem'))
    expect(items).toHaveLength(todos.length)
    expect(items[0]).toHaveText('First')
    expect(items[1]).toHaveText('Second')
    expect(items[2]).toHaveText('Third')

    // if I leave this out, I'll get
    //  Error: 1 timer(s) still in the queue.
    flush()
  }))
})
