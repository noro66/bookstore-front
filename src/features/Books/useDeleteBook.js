import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBook as deleteCaniApi } from "../../services/apiBooks";

export function useDeleteBook() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBook } = useMutation({
    mutationFn: deleteCaniApi,
    onSuccess: () => {
      toast.success("Book successfully  deleted !");
      queryClient.invalidateQueries({
        queryKey: ["Books"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBook };
}
