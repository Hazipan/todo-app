import { Draggable } from 'react-beautiful-dnd';

const Todo = (props: any) => {
    let completed = '';
    if (props.completed) {
        completed = ' completed'
    }
    return (
        <Draggable draggableId={`task${props.index}`} index={props.index}>
            {(provided) => (
                <div
                    className='todo'
                    id={props.index}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className={`todoContent${completed}`} onClick={props.todoClick} tabIndex={props.index}>
                        <div className='checkBubble' tabIndex={props.index}>
                            <img className='check' src='./images/icon-check.svg' alt='complete' tabIndex={props.index} />
                        </div>
                        <p className='todoText' tabIndex={props.index}>{props.text}</p>
                    </div>
                    <img className='remove' src="./images/icon-cross.svg" alt='remove' onClick={props.removeClick} tabIndex={props.index} />
                </div>
            )}

        </Draggable>
    )
}

export default Todo;