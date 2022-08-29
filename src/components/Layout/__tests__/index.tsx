import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { Layout } from '../index';

describe('layout', () => {
  test('document title', () => {
    render(
      <Provider store={store}>
        <Layout />
      </Provider>
    );

    expect(document.title).toEqual('Getir Assignment');

    render(
      <Provider store={store}>
        <Layout title="Test Title" />
      </Provider>
    );

    expect(document.title).toEqual('Test Title');
  });
});
