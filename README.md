# React DnD

A set of components for Drag and Drop in React.

**Note: this is still very much in it's infancy and therefore not recommended for use anywhere.**
>Current status: Working on the placement of the placeholder and allowing reordering of draggable items in a droppable container.

## Drag and Drop in action:
<img src="http://kevinkroon.nl/images/react_drag_drop.gif" />

>Current version supports dragging and dropping with multiple events and custom CSS per droppable container for the placeholder.

## Usage (basic):
```
<Context onDragEnd={onDragEnd}>
        
        <Droppable droppableId="uniqueDroppableId">
          {(droppableData) => (
            <div>
              <Draggable draggableId="uniqueDraggableId" draggableIndex={0}>
                {(draggableData) => (
                  <div/>
                )}
              </Draggable>
              {data.placeholder}
            </div>
          )}
        </Droppable>

        <Droppable droppableId="anotherDroppableId">
          {(droppableData) => (
            <div>
              <Draggable draggableId="anotherDraggableId" draggableIndex={0}>
                {(draggableData) => (
                  <div/>
                )}
              </Draggable>
              {data.placeholder}
            </div>
          )}
        </Droppable>
        
</Context>
```
