import { useAppSelector } from "../../hooks";
import { selectNotes } from "../../store/notesSlice";
import { selectUser } from "../../store/userSlice";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const datePart = date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} at ${timePart}`;
};

function NoteList() {
  const user = useAppSelector(selectUser);
  const notes = useAppSelector(selectNotes);
  // Filter notes to only those owned by the logged-in user
  const userNotes = notes.filter((note) => note.owner === user);

  return userNotes && userNotes.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
      {userNotes.map((note) => (
        <div
          key={note.id}
          className="bg-white border shadow-md p-4 rounded-lg flex flex-col"
        >
          <div className="font-semibold text-lg">{note.title}</div>
          <div className="text-sm text-gray-600">Onwer: {note.owner}</div>
          <div className="text-sm text-gray-600 mb-2">
            Created on: {formatDate(note.createdAt)}
          </div>
          <p className="flex-1 text-gray-800">{note.description}</p>
          <div className="flex justify-between mt-4">
            <button
              // onClick={() => onEditNote(note.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Edit
            </button>
            <button
              // onClick={() => onDeleteNote(note.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-700 text-center w-full text-lg font-bold">
      No notes available.
    </p>
  );
}

export default NoteList;
