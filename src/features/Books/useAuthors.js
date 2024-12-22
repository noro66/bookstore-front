import { useQuery } from "@tanstack/react-query";
import { getAuthors } from "../../services/apiBooks.js";

export function useAuthors() {
  const {
    isPending,
    data: Authors,
    error,
  } = useQuery({
    queryKey: ["Authors"],
    queryFn: () => getAuthors(),
  });

  return {
    isPending ,
    Authors,
    error,
  };
}
