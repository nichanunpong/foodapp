import { useState, useCallback } from 'react';
import Search from './components/Search';
import FoodList from './components/FoodList';
import Nav from './components/Nav';
import './App.css'; // All styles on the website
import Container from './components/Container';
import InnerContainer from './components/InnerContainer';
import FoodDetails from './components/FoodDetails';
import ErrorBoundary from './components/ErrorBoundary';

/**
 * Main App component that manages the food recipe application state
 * @component
 */
function App() {
  // State for managing food data and selected food
  const [foodData, setFoodData] = useState([]);
  const [foodId, setFoodId] = useState('658615');
  const [isLoading, setIsLoading] = useState(false);

  // Memoized handler for updating food data
  const handleFoodDataUpdate = useCallback((data) => {
    setFoodData(data);
  }, []);

  return (
    <ErrorBoundary>
      <div className='App'>
        <Nav />
        <Search
          foodData={foodData}
          setFoodData={handleFoodDataUpdate}
          setIsLoading={setIsLoading}
        />
        <Container>
          <InnerContainer>
            <FoodList
              foodData={foodData}
              setFoodId={setFoodId}
              isLoading={isLoading}
            />
          </InnerContainer>
          <InnerContainer>
            <FoodDetails foodId={foodId} isLoading={isLoading} />
          </InnerContainer>
        </Container>
      </div>
    </ErrorBoundary>
  );
}

export default App;
