const Input = (props: any) => {
    return(
        <div className='todoContainer'>
            <div className='checkBubble' />
            <input 
                type='text' 
                placeholder='Create a new todo' 
                className='input' 
                onKeyPress={props.onKeyPress}  
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    )
}

export default Input;