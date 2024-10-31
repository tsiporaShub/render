import { BrowserRouter as Router } from 'react-router-dom';
import TopNavComponent from './components/topNav.component';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import Footer from './components/footer.component.tsx';
import RoutesComponent from './components/routes.component.tsx';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <TopNavComponent />
        <RoutesComponent />
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;
