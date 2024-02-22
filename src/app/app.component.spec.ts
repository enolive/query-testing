import { AppComponent } from './app.component'
import {
  byRole,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest'

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>
  const createComponent = createComponentFactory(AppComponent)

  it('renders component', () => {
    const spectator = createComponent()

    spectator.detectChanges()

    const title = spectator.query(byRole('heading'))
    expect(title).toHaveText('Hello, Todos!')
    const list = spectator.query(byRole('list'))
    expect(list).toExist()
    const items = spectator.queryAll(byRole('listitem'))
    expect(items).not.toHaveLength(0)
  })
})
