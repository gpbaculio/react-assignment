import { useAppSelector } from "../../hooks";
import { selectNotes } from "../../store/notesSlice";
import { selectUser } from "../../store/userSlice";
import Note from "./Note";

function NoteList() {
  const user = useAppSelector(selectUser);
  const notes = useAppSelector(selectNotes);
  // Filter notes to only those owned by the logged-in user
  const userNotes = notes.filter((note) => note.owner === user);

  return userNotes && userNotes.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
      {userNotes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  ) : (
    <p className="text-gray-700 text-center w-full text-lg font-bold">
      No notes available.
    </p>
  );
}

export default NoteList;
