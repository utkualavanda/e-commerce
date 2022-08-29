import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../../../store';
import NotFound from '../index';

describe('not found', () => {
  test('renders not found', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </Provider>
    );

    const notFoundText = screen.getByText(/page not found/i);

    expect(notFoundText).toBeInTheDocument();
  });
});
