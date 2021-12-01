import { btnJson } from "./constant"
import { ProductsProvider } from "./contexts/ProductContext";
import Home from "./pages/home";

function App() {
  return (
    <>
    <ProductsProvider>
      <Home btnJson = { btnJson }/>
    </ProductsProvider>
    </>
  );
}

export default App;
