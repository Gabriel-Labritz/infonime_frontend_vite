import React, { useEffect, useState } from "react";
import { useFetchUserProfile } from "../../hooks/useFetchUserProfile";
import { userRegisterInterface } from "../../utils-types/user-register-interface";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile";

import Input from "../../components/Input/Input";
import NavBar from "../../components/NavBar/NavBar";
import { MdOutlineEmail } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import CloseAccountModal from "../../components/CloseAccountModal/CloseAccountModal";
import Footer from "../../components/Footer/Footer";

import "./Profile.css";

function Profile() {
  const [newUserProfile, setNewUserProfile] = useState<userRegisterInterface>({
    user_name: "",
    email: "",
    password: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user, error, isLoading } = useFetchUserProfile();
  const { loading, updateUserProfile } = useUpdateUserProfile();

  useEffect(() => {
    if (user) {
      setNewUserProfile({
        user_name: user.user_name,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const isFormFilled =
    newUserProfile.user_name !== user?.user_name.trim() ||
    newUserProfile.email !== user?.email.trim() ||
    newUserProfile.password.trim() !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserProfile({ ...newUserProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUserProfile(newUserProfile);
  };

  return (
    <>
      <NavBar />
      {isLoading && <Loading />}
      {error && <ErrorMessage message={error} />}

      <div className="profile-container">
        <div className="profile-header">
          <h2 className="profile-header-title">Seu perfil</h2>
        </div>

        <div className="profile-content">
          <div className="form-profile-area">
            <form method="post" onSubmit={handleSubmit}>
              <Input
                type="text"
                name="user_name"
                value={newUserProfile.user_name}
                placeholder="Alterar nome de usuário"
                icon={<FaRegUser size={25} />}
                onHandleChange={handleChange}
              />

              <Input
                type="text"
                name="email"
                value={newUserProfile.email}
                placeholder="Alterar email"
                icon={<MdOutlineEmail size={28} />}
                onHandleChange={handleChange}
              />

              <Input
                type="password"
                name="password"
                value={newUserProfile.password}
                placeholder="Alterar senha"
                icon={<FiLock size={25} />}
                onHandleChange={handleChange}
              />

              <Button
                txtButton={
                  loading ? (
                    <>
                      <span className="spinner"></span> Atualizando...
                    </>
                  ) : (
                    "Atualizar perfil"
                  )
                }
                disabled={!isFormFilled || loading}
              />
            </form>
            <div
              className="close-account-container"
              onClick={() => setModalIsOpen(true)}
            >
              <div className="close-account-box">
                <div className="close-account-area">
                  Deseja encerrar sua conta ?
                  <span className="close-account-span">Encerrar conta.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CloseAccountModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
      <Footer />
    </>
  );
}

export default Profile;
