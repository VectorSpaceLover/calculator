import { useState, useContext } from 'react';
import ProductList from "../components/product/productlist";
import TouchPad from "../components/touchpad";
import Display from "../components/display";
import { ProductsContext } from '../contexts/ProductContext';

const X_KEY = 0;
const KG_KEY = 1;
const NORMAL_KEY = 2;

const A_KEY = 'a';
const B_KEY = 'b';
const C_KEY = 'c';
const D_KEY = 'd';

const BAG_KEY = 'bag';



export default function Home({btnJson}){
    const [totalLine, setTotalLine] = useState(0);
    const [priceLine, setPriceLine] = useState('');
    const [countLine, setCountLine] = useState('');
    const [numberLine, setNumberLine] = useState('');
    
    const [Products, setProducts] = useContext(ProductsContext);
    const [keyState, setKeyState] = useState(NORMAL_KEY);
    const [disProducts, setDisProducts] = useState([]);
    const [indexActivate, setActivate] = useState(0);
    const [referenceActivate, setReferenceActivate] = useState('');

    var newProduct = {};
    
    const handleArrowBtn = (isUp) => {

        let newProductList = Products.map((val, index) => {
            if(val['reference'] === referenceActivate)
            {
                let curPrice = 0;
                if(isUp)
                    curPrice = parseInt(val['price']) + 1;
                else
                    curPrice = parseInt(val['price']) - 1;
                return { ...val, price: curPrice.toString()}
            }
            else{
                return val;
            }
        })

        let newDisProductList = disProducts.map((val, index) => {
            if(val['reference'] === referenceActivate)
            {
                let curPrice = 0;
                if(isUp)
                    curPrice = parseInt(val['price']) + 1;
                else
                    curPrice = parseInt(val['price']) - 1;
                return { ...val, price: curPrice.toString()}
            }
            else{
                return val;
            }
        })
        
        setProducts(newProductList);
        setDisProducts(newDisProductList);
    }

    const changeProduct = () => {
        let newProductList = Products.map((val, index) => {
            if(keyState !== BAG_KEY){
                if(val['reference'] === A_KEY)
                    return { ...val, weightProduct: countLine };
                else{
                    if(val['reference'] === keyState && val['allowNewPrice'] === '1')
                        return { ...val, price: countLine };
                    else
                        return val;
                }
            }
            else{
                if(val['reference'] === keyState && val['allowNewPrice'] === '1')
                        return { ...val, price: countLine };
                    else
                        return val;
            }
        })
        console.log(countLine);
        setProducts(newProductList);
        console.log(Products);
    }

    const handleClick = (keyName) => {
        let sName = parseInt(keyName);
        if(!isNaN(sName)){
            if(keyState === NORMAL_KEY){
                setNumberLine(numberLine + keyName);
            }
            else{
                setCountLine(countLine + keyName);
            }
        }
        else{
            if(keyName === 'cancel'){
                setNumberLine('');
                setPriceLine('');
                setCountLine('');
                setTotalLine(0);
                newProduct = {};
                setKeyState(NORMAL_KEY);
            }
            else{
                if(keyName === 'del'){
                    setNumberLine(numberLine.slice(0, numberLine.length-1));
                }
                else{
                    if(keyName === 'x' || keyName === 'X'){
                        setKeyState(X_KEY);
                    }
                    else{
                        if(keyName === 'kg' || keyName === 'KG'){
                            setKeyState(KG_KEY);
                        }
                        else{
                            if(keyName === 'enter' || keyName === 'ENTER'){
                                displayProduct();
                            }
                            else{
                                if(keyName === 'a' || keyName === 'A'){
                                    setKeyState(A_KEY);
                                }
                                else{
                                    if(keyName === 'b' || keyName === 'B'){
                                        setKeyState(B_KEY);
                                    }
                                    else{
                                        if(keyName === 'c' || keyName === 'C'){
                                            setKeyState(C_KEY);
                                        }
                                        else{
                                            if(keyName === 'd' || keyName === 'D'){
                                                setKeyState(D_KEY);
                                            }
                                            else{
                                                if(keyName === 'bag' || keyName === 'BAG'){
                                                    setKeyState(BAG_KEY);
                                                }
                                                else{
                                                    if(keyName === 'arrow-down'){
                                                        handleArrowBtn(false);
                                                    }
                                                    else{
                                                        if(keyName === 'arrow-up'){
                                                            handleArrowBtn(true);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const getFindProduct = () => {
        newProduct = Products.filter((val, index) => {
            if(val['reference'] === numberLine)
                return true;
            else
                return false;
        })
    }

    const displayProduct = () => {
        if(keyState === NORMAL_KEY){
            getFindProduct();
            if(newProduct.length > 0){
                setDisProducts([...disProducts, ...newProduct]);
                let price = newProduct[0]['price'];
                setPriceLine(price);
                setTotalLine(totalLine + parseInt(price));

            }
        }
        else{
            if(keyState === X_KEY){
                getFindProduct();
                if(newProduct.length > 0)
                {
                    setDisProducts([...disProducts, ...newProduct]);
                    let price = newProduct[0]['price'];
                    let nPrice = parseInt(price) * parseInt(countLine);
                    setPriceLine(nPrice.toString());
                    setTotalLine(totalLine + nPrice);
                }
            }
            else{
                if(keyState === KG_KEY){
                    getFindProduct();
                    if(newProduct.length > 0)
                    {
                        setDisProducts([...disProducts, ...newProduct]);
                        if(parseInt(newProduct[0]['weightProduct']) !== 0)
                        {
                            let price = parseInt(newProduct[0]['price']) / parseInt(newProduct[0]['weightProduct']) * parseInt(countLine);
                            setPriceLine(price.toString());
                            setTotalLine(totalLine + price);
                        }
                        
                    }
                }
                else{
                    switch(keyState){
                        case A_KEY:
                        case B_KEY:
                        case C_KEY:
                        case D_KEY:
                        case BAG_KEY:
                        {
                            changeProduct();
                            break;
                        }
                        default:
                            break;
                    }
                }
            }
        }
        setCountLine('');
        setKeyState(NORMAL_KEY);
    }

    const handleKey = (e) => {
        let codeName = e.code;
        if(codeName === 'Enter'){
            displayProduct();
        }
        else{
            if(codeName === 'Backspace'){
                if(keyState === NORMAL_KEY)
                    setNumberLine(numberLine.slice(0, numberLine.length-1));
                else
                    setCountLine(countLine.slice(0, countLine.length-1));
                
            }
            else{
                if(codeName === 'NumpadEnter'){
                    displayProduct();
                }
                else{
                    if(codeName.indexOf('Numpad') >= 0 || codeName.indexOf('Digit') >= 0){
                        codeName = codeName.replace('Numpad', '');
                        codeName = codeName.replace('Digit', '');
                        if(keyState === NORMAL_KEY)
                            setNumberLine(numberLine + codeName);
                        else
                            setCountLine(countLine + codeName);
                    }
                    else{
                        if(codeName === 'ArrowUp')
                            handleArrowBtn(true);
                        else{
                            if(codeName === 'ArrowDown')
                                handleArrowBtn(false);
                            else{

                            }

                        }
                    }
                }
                
            }
        }
        e.preventDefault();
    }

    const setItemActivate = (index, reference) => {
        setActivate(index);
        setReferenceActivate(reference);
    }
    return (
        <>
            <div 
                className="d-flex flex-row"
                tabIndex="0"
                onKeyDown={handleKey}
                autoFocus
            >
                <ProductList activeItem = {indexActivate} setItemActivate = {setItemActivate} style = {{height: '100px'}} productlist = {disProducts}/>
                <div style={{width: '500px'}}>
                    <div className="d-flex flex-column">
                        <div className="" style={{margin: '0 0 0 30px'}}>
                            <Display totalLine = {totalLine.toString()} countLine = {countLine} numberLine = {numberLine} priceLine = {priceLine}/>
                        </div>
                        <TouchPad btnJson = {btnJson} handleClick = {handleClick}/>
                    </div>
                </div>
            </div>
            
        </>
    )
}