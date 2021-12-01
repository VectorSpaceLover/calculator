import CustomButton from './custombutton'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

export default function NumberButton({ detailInfo, index, handleClick}){
    const {caption, name, funciton, 
        x, y, span, visible, enabled, 
        style, color, backgroundcolor, icon} = detailInfo;

    return (
        <>
            {(name === 'arrow-up')? 
                (<CustomButton 
                    variant="contained" 
                    label={caption} 
                    styleObject={{
                        borderColor: backgroundcolor,
                        backgroundColor: backgroundcolor, 
                        color: color, 
                        width: (caption === 'enter')?'200px':'100px'
                    }}
                    isIconButton={true}
                    Icon = {<ArrowUpwardIcon/>}
                    onClick = {() => handleClick(caption)}
                />):(
                    <CustomButton 
                        variant="contained" 
                        label={caption} 
                        styleObject={{
                            borderColor: backgroundcolor,
                            backgroundColor: backgroundcolor, 
                            color: color, 
                            width: (caption === 'enter')?'200px':'100px'
                        }}
                        isIconButton={(name === 'arrow-down')?true:false}
                        Icon = {(name === 'arrow-down')?<ArrowDownwardIcon/>:undefined}
                        onClick = {() => handleClick(caption)}
                    />
                )
            }
            {((index === 4) || (index === 9) || (index === 14) || (index === 18))?<br></br>:<></>}
        </>
    )
}

