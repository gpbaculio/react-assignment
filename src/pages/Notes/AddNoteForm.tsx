import React, { useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface NoteFormInput {
  title: string;
  description: string;
}

const AddNoteForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormInput>();

  const onSubmit: SubmitHandler<NoteFormInput> = (data) => {
    reset();
    setIsOpen(false);
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Note
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={handleOverlayClick}
        >
          <div
            ref={modalRef}
            className="bg-white p-5 rounded-lg max-w-lg w-full mx-auto mt-20"
          >
            <button onClick={closeModal} className="float-right font-semibold">
              X
            </button>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Add a Note</h2>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="Title"
                className="input input-bordered w-full border p-2 rounded"
              />
              {errors.title && (
                <span className="text-red-500 text-xs">
                  {errors.title.message}
                </span>
              )}

              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Description"
                className="textarea textarea-bordered w-full border p-2 rounded"
              />
              {errors.description && (
                <span className="text-red-500 text-xs">
                  {errors.description.message}
                </span>
              )}

              <button
                type="submit"
                className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNoteForm;
