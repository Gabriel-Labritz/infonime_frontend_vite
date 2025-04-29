import { useEffect, useState } from "react";
import api from "../utils/api";
import { UserProfile } from "../utils-types/user-profile";

interface UserProfileApiResponse {
  user: UserProfile;
}

export function useFetchUserProfile() {
  const [user, setUser] = useState<UserProfile>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    try {
      setIsLoading(true);

      const response = await api.get<UserProfileApiResponse>(
        "/users/myprofile"
      );

      setUser(response.data.user);
      setError(null);
    } catch (error) {
      setError(
        (error as any).response.data.message ||
          (error instanceof Error
            ? error.message
            : "Ocorreu um erro, tente novamente mais tarde.")
      );
    } finally {
      setIsLoading(false);
    }
  }

  return { user, error, isLoading };
}
