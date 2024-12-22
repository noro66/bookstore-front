import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditBook } from "../../services/apiBooks";
import toast from "react-hot-toast";

export function useCreateBook() {
  const queryclient = useQueryClient();
  const { mutate: createBook, isPending: isCreating } = useMutation({
    mutationFn: createEditBook,
    onSuccess: () => {
      toast.success("New Book succussfully created !");
      queryclient.invalidateQueries({
        queryKey: ["Books"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createBook };
}
