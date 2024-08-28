import './Answer.css';

function Answer(props) {
    const classes = ['Bean', 'Bitter Gourd', 'Bottle Gourd', 'Brinjal', 'Broccoli', 'Cabbage', 'Capsicum', 'Carrot', 'Cauliflower', 'Cucumber', 'Papaya', 'Potato', 'Pumpkin', 'Radish', 'Tomato']

    return (
        <div className='answer'>
            <div className='ansheader'>
                <img src={"/"+classes[props.param]+".jpg"} />
                <h1>{classes[props.param]}</h1>
            </div>
            
        </div>
    )
}
export default Answer