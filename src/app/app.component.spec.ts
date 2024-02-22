import {AppComponent} from './app.component';
import {render, screen, within} from "@testing-library/angular";

describe('AppComponent', () => {
  it('renders component', async () => {
    await render(AppComponent)

    const title = screen.getByRole('heading')
    expect(title).toHaveTextContent('Hello, Todos!')
    const list = await screen.findByRole('list')
    const items = await within(list).findAllByRole('listitem');
    expect(items).not.toHaveLength(0)
  });
});
