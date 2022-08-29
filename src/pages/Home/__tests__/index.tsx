import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import Home from '../index';

describe('home page', () => {
  test('inital state', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const headerBasket = screen.getByAltText(/basket logo/i);
    expect(headerBasket).toBeInTheDocument();

    const priceLowToHighButton = screen.getByLabelText(/price low to high/i);
    expect(priceLowToHighButton).toBeChecked();

    const searchBrandButton = screen.getByLabelText(/search brand/i);
    expect(searchBrandButton).not.toHaveValue();

    const searchTagButton = screen.getByLabelText(/search tag/i);
    expect(searchTagButton).not.toHaveValue();

    const defaultPrices = screen.getAllByText(/0.00/);
    expect(defaultPrices).toHaveLength(2);

    const tabMug = screen.getByText('mug');
    expect(tabMug).toHaveClass('active');
  });

  test('sort change', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const priceHighToLowButton = screen.getByLabelText(/price high to low/i);
    //eslint-disable-next-line
    act(() => {
      userEvent.click(priceHighToLowButton);
    });
    expect(priceHighToLowButton).toBeChecked();

    const priceLowToHighButton = screen.getByLabelText(/price low to high/i);
    //eslint-disable-next-line
    act(() => {
      userEvent.click(priceLowToHighButton);
    });
    expect(priceLowToHighButton).toBeChecked();

    const newToOldButton = screen.getByLabelText(/new to old/i);
    //eslint-disable-next-line
    act(() => {
      userEvent.click(newToOldButton);
    });
    expect(newToOldButton).toBeChecked();

    const oldToNewButton = screen.getByLabelText(/old to new/i);
    //eslint-disable-next-line
    act(() => {
      userEvent.click(oldToNewButton);
    });
    expect(oldToNewButton).toBeChecked();
  });
});
