import { useSelector } from 'react-redux';

export const Header = () => {
  const { total } = useSelector((store: any) => store.cart);

  return (
    <div className="page-header">
      <div className="container">
        <img src="images/market.png" alt="logo" className="logo" />
        <div className="total-price-container">
          <img src="images/basket.png" alt="basket logo" />
          <div className="total-price">{`₺ ${total}`}</div>
        </div>
      </div>
    </div>
  );
};
