import { AppComponent } from './app.component'
import { byRole, createComponentFactory } from '@ngneat/spectator/jest'

describe('AppComponent', () => {
  const createComponent = createComponentFactory(AppComponent)

  it('renders component', async () => {
    const spectator = createComponent()

    await spectator.fixture.whenStable()

    const title = spectator.query(byRole('heading'))
    expect(title).toHaveText('Hello, Todos!')
    const list = spectator.query(byRole('list'))
    expect(list).toExist()
    const items = spectator.queryAll(byRole('listitem'))
    expect(items).not.toHaveLength(0)
  })
})
