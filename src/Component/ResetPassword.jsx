import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./api.jsx";
import { useSnackbar } from "./Context/SnackbarContext.jsx";
import InputField from "./InputField.jsx";
import Button from "./Button.jsx";
import Navbar from "./Navbar.jsx";

function ResetPassword(props) {
  const [newPassword, SetNewPassword] = useState("");
  const [confirmNewPassword, SetConfirmNewPassword] = useState("");
  const { token } = useParams(); // Get token from URL parameters
  const navigate = useNavigate();

  //snackbar options
  const { showSnackbar } = useSnackbar();

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (newPassword === confirmNewPassword) {
      try {
        const response = await api.post(`/reset-password/${token}`, {
          password: newPassword,
        });
        if (response.status === 200) {
          showSnackbar("Password reset successfully!", "success");
        }
        navigate("/login");
      } catch (err) {
        showSnackbar("assword reset error!", "error");
      }
    }
  }
  return (
    <section className="bg-black">
      <div className="mx-5 md:mx-10">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-dvh gap-4">
          <h3 className="text-white text-4xl font-zentry">
            Create New Password
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex justify-center items-center"
          >
            <div className="flex flex-col gap-3">
              <InputField
                type="password"
                name="password"
                placeholder="New Password"
                width="100%"
                value={newPassword}
                containerClass="text-black"
                onChange={(evt) => SetNewPassword(evt.target.value)}
              />
              <InputField
                type="password"
                name="c_password"
                placeholder="Confirm New Password"
                width="100%"
                value={confirmNewPassword}
                containerClass="text-black"
                onChange={(evt) => SetConfirmNewPassword(evt.target.value)}
              />
              <Button
                title="Reset Password"
                id="resetPasswordBtn"
                containerClass="w-full bg-violet-300 text-white mt-0"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
