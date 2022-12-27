import { Route, Routes } from 'react-router-dom';
import MyBooks from './pages/MyBooks';
import NavBar from './components/NavBar';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Store from './pages/Store';
import Faqs from './pages/Faqs';
import ListingPage from './pages/listing/[listingId]';

function App() {

  const Docs = () => {
    window.location.replace("https://bookverse.gitbook.io/bookverse/");
  }

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Store />} />
        <Route path='/shelf' element={<MyBooks />} />
        <Route path='/faqs' element={<Faqs/>} />
        <Route path='/listing/:listingId' element={<ListingPage />} />
        <Route path='/docs' element={<Docs/>} />
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;
