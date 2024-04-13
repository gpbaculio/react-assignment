import { useEffect, useRef, useState } from "react";

import { editNote, Note as NoteType } from "../../store/notesSlice";
import { useAppDispatch } from "../../hooks";

interface NoteProps {
  note: NoteType;
}

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

function Note({ note }: NoteProps) {
  const dispatch = useAppDispatch();
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedDescription, setEditedDescription] = useState(note.description);

  useEffect(() => {
    if (isEditing) {
      // Focus the title input when edit mode is activated
      if (titleInputRef && titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(note.title);
    setEditedDescription(note.description);
  };

  const handleSave = () => {
    dispatch(
      editNote({
        id: note.id,
        title: editedTitle,
        description: editedDescription,
      })
    );
    alert("Note updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="bg-white border shadow-md p-4 rounded-lg flex flex-col">
      {isEditing ? (
        <>
          <input
            type="text"
            ref={titleInputRef}
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="font-semibold text-lg mb-2 border p-1 rounded"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="flex-1 text-gray-800 mb-2 border p-1 rounded"
          />
        </>
      ) : (
        <>
          <div className="font-semibold text-lg">{note.title}</div>
          <p className="flex-1 text-gray-800 mb-2">{note.description}</p>
        </>
      )}
      <div className="text-sm text-gray-600">Owner: {note.owner}</div>
      <div className="text-sm text-gray-600">
        Created on: {formatDate(note.createdAt)}
      </div>
      <div className="flex justify-between mt-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-blue-500 border hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 border hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            >
              Edit
            </button>
            <button
              //   onClick={() => onDeleteNote(note.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Note;
