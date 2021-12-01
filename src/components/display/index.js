const style = {
    borderBottom: '1px solid black', 
    height: '20px',
}
export default function Display ({totalLine, numberLine, countLine, priceLine}) {

    return (
        <div className="d-flex align-items-start flex-column">
            <p style = {style}>{totalLine}</p>
            <p style = {style}>{priceLine}</p>
            <p style = {style}>{countLine}</p>
            <p style = {style}>{numberLine}</p>
        </div>
    )
}