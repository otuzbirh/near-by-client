import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import {Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import NearMe from "./pages/NearMe";

function App() {
  return (
    <section>

      <Header />
      <main>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/u-blizini" element={<NearMe />} />

        <Route path="/product/:id" element={<ProductDetail /> } />
        </Routes>
      </main>
      <Footer />

    </section>
  );
}

export default App;
