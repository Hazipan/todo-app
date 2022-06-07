const Input = (props: any) => {
    return(
        <div className='todoContainer'>
            <div className='checkBubble' />
            <input type='text' placeholder='Create a new todo' className='input' />
        </div>
    )
}

export default Input;