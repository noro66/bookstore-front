import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditBook } from "../../services/apiBooks";
import toast from "react-hot-toast";

export function useEditBook() {
  const queryclient = useQueryClient();

  const { mutate: editBook, isPending: isEditing } = useMutation({
    mutationFn: ({ newBookData, id }) => createEditBook(newBookData, id),
    onSuccess: () => {
      toast.success("New Book succussfully Edied !");
      queryclient.invalidateQueries({
        queryKey: ["Books"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editBook };
}
