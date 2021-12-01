import NumberButton from './numberbutton';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TouchPad ({ btnJson, handleClick}) {
    const padInfo = btnJson[0]['col'][1][1]['table'];

    return (
        <>
            <div id = {btnJson[0]['@id']}>
                <div className='w-100'>
                    {padInfo.map((val, index) => 
                        <NumberButton key = {index} 
                            detailInfo = {val} 
                            index = {index} 
                            handleClick = {handleClick}    
                        />)}
                </div>
            </div>
        </>
    )
}