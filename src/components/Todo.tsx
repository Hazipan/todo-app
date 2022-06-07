const Todo = (props: any) => {
    return (
        <div className='todo'>
            <div className='todoContent' onClick={props.todoClick}>
                <div className='checkBubble'>
                    <img className='check' src='./images/icon-check.svg' alt='' />
                </div>
                <p className='todoText'>{props.text}</p>
            </div>
            <img className='remove' src="./images/icon-cross.svg" alt={props.index} onClick={props.removeClick} />
        </div>
    )
}

export default Todo;