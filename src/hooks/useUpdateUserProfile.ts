import { useState } from "react";
import { userRegisterInterface } from "../utils-types/user-register-interface";
import { toast } from "react-toastify";
import api from "../utils/api";

export function useUpdateUserProfile() {
  const [loading, setLoading] = useState(false);

  async function updateUserProfile(
    newUserProfile: userRegisterInterface
  ): Promise<void> {
    try {
      setLoading(true);
      const fieldsToCheck = ["user_name", "email", "password"] as const;

      const updatedFields = fieldsToCheck.reduce((obj, field) => {
        // pega o valor do campo atual a cada iteração(ex: newUserProfile.user_name)
        const value = newUserProfile[field];

        // verfica se tem valor (ex: newUserProfile.user_name)
        if (value?.trim()) {
          obj[field] = value.trim(); // adiciona ao obj({}) o campo
        }

        return obj; // retorna o objeto atualizado
      }, {} as Partial<userRegisterInterface>);

      if (Object.keys(updatedFields).length === 0) {
        toast.error("Nenhuma informação para atualizar.");
        return;
      }

      const response = await api.patch("/users/update", updatedFields);

      toast.success(response.data.message || "Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error(
        (error as any).response.data.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro ao atualizar o usuário, tente novamente.")
      );
    } finally {
      setLoading(false);
    }
  }

  return { loading, updateUserProfile };
}
