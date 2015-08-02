import uuid from 'node-uuid';
import AltContainer from 'alt/AltContainer';
import React from 'react';
import Notes from './Notes';
import NoteActions from '../actions/NoteActions';
import NoteStores from '../stores/NoteStores';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.addItem}>+</button>
        <AltContainer
          stores={[NoteStores]}
          inject={ {
            items: () => NoteStores.getState().notes
          } }
          >
          <Notes onEdit={this.itemEdited} />
        </AltContainer>
      </div>
    );
  }
  addItem() {
    NoteActions.create({id: uuid.v4(), task: 'New Task'});
  }
  itemEdited(id, task) {
    if(task) {
      NoteActions.update({id, task});
    }
    else {
      NoteActions.delete(id);
    }
  }
}
