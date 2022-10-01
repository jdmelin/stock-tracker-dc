import { useEffect, useState } from 'react';
import stockService from '../../services/stockService';
import Row from 'react-bootstrap/Row';
import Stock from '../../components/Stock/Stock';
import { Link, useParams } from 'react-router-dom';

function MyStocks() {
  const [stocks, setStocks] = useState([]);
  const [stockAverage, setStockAverage] = useState(0);
  const { userId } = useParams();

  useEffect(() => {
    getStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const average = stockService.getAveragePrice(stocks);
    setStockAverage(average);
  }, [stocks]);

  const getStocks = async () => {
    try {
      const response = await stockService.fetchMyStocks(userId);
      const stockData = await response.json();
      const stocksWithPrices = await stockService.setStockPrices(stockData);
      setStocks(stocksWithPrices);
    } catch {
      // TODO: handle error
    }
  };

  const handleRemoveStockFromFavorites = async (stockId) => {
    try {
      const response = await stockService.removeStockFromFavorites(
        userId,
        stockId
      );
      const { message } = await response.json();

      if (message === 'success') {
        const updatedStocks = stocks.filter((stock) => stock.id !== stockId);
        setStocks(updatedStocks);
      }
    } catch {
      // TODO: handle error
    }
  };

  return (
    <>
      <h1 className="display-4">My Stocks</h1>
      <Link to={`/stocks/${userId}`}>See All Stocks</Link>
      <hr className="my-4" />
      <h4 className="mb-3">Average Price: ${stockAverage}</h4>
      <Row>
        {stocks.map((stock) => (
          <Stock
            key={stock.id}
            onRemoveStockFromFavorites={handleRemoveStockFromFavorites}
            stock={stock}
            type="my"
          />
        ))}
      </Row>
    </>
  );
}

export default MyStocks;
