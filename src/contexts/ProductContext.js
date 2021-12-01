import React, { useState } from 'react';
import {productJson} from '../constant'
const ProductsContext = React.createContext([{}, () => {}]);

const ProductsProvider = (props) => {
  const [Products, setProducts] = useState(productJson);
  return (
    <ProductsContext.Provider value={[Products, setProducts]}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export {ProductsContext, ProductsProvider};