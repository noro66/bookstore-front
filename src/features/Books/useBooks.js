import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../../services/apiBooks";

export function useBooks() {
  const {
    isPending,
    data: Books,
    error,
  } = useQuery({
    queryKey: ["Books"],
    queryFn: () => getBooks(),
  });

  return {
    isPending ,
    Books,
    error,
  };
}
