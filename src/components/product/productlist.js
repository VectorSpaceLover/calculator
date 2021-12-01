import '../../assets/style.css'
const ProductItem = ({info, index, setItemActivate, isFocus, reference}) => {
    const handleClick = () => {
        setItemActivate(index, reference);
    }
    
    return (
        <>
        {isFocus?
            (<div className='row align-items-center' style={{border: '1px solid black', borderStyle: 'inset', heiht: '40px', fontSize: '25px'}} onClick={handleClick}>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                    {info.name}
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                    <b>Price</b>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                    {info.price}
                </div>
            </div>):(<div className='row align-items-center' style={{borderBottom: '1px solid black', heiht: '40px', fontSize: '25px'}} onClick={handleClick}>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                    {info.name}
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                    <b>Price</b>
                </div>
                <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                    {info.price}
                </div>
            </div>)
        }
        </>
    )
}

export default function ProductList({productlist, setItemActivate, activeItem}) {
    return (
        <div style={{padding: '20px', height: '337px', minWidth: '400px', overflow: 'auto', overflowX: 'hidden'}}>
            <div className='d-flex flex-column'>
                {productlist.map((val, index) => <ProductItem isFocus = {(activeItem === index)?true:false} reference = {val.reference} setItemActivate = {setItemActivate} key = {index} info = {val} index = {index} />)}
            </div>
            
        </div>
    )
}