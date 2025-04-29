import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useUserContext } from "./useUserContext";

interface ApiResponseMessage {
  message: string;
}

export function useCloseUserAccount() {
  const { logout } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);

  async function closeUserAccount() {
    try {
      setIsLoading(true);

      const response = await api.delete<ApiResponseMessage>("/users/delete");

      toast.success(
        response.data.message || "Sua conta foi excluída com sucesso."
      );

      logout();
    } catch (error) {
      toast.error(
        (error as any).response.data.message ||
          (error instanceof Error
            ? error.message
            : "Erro ao excluir sua conta, tente novamente.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { closeUserAccount, isLoading };
}
