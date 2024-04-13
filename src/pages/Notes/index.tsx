import AddNoteForm from "./AddNoteForm";
import NoteList from "./NoteList";

function Notes() {
  return (
    <div className="container mx-auto px-4">
      <AddNoteForm />
      <NoteList />
    </div>
  );
}

export default Notes;
