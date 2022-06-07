const Input = (props: any) => {
    return(
        <div className='inputContainer'>
            <div className='checkBubble' />
            <input 
                type='text' 
                placeholder='Create a new todo...' 
                className='input' 
                onKeyPress={props.onKeyPress}  
                value={props.value}
                onChange={props.onChange}
                autoCapitalize='on'
            />
        </div>
    )
}

export default Input;