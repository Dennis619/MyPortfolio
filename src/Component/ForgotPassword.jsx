import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";
import { useSnackbar } from "./Context/SnackbarContext.jsx";
import InputField from "./InputField.jsx";
import Button from "./Button.jsx";
import Navbar from "./Navbar.jsx";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  //snackbar options
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return showSnackbar("Please enter an email.", "error");

    setSubmitting(true);
    try {
      await api.post("/forgot-password", { email });
      showSnackbar(
        "If that email exists, you’ll receive a reset link.",
        "success"
      );
      setEmail("");
      navigate("/login"); // or wherever you like
    } catch (err) {
      console.error(err);
      showSnackbar("Failed to send reset email.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className=" bg-black">
      <div className="mx-5 md:mx-10">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-dvh gap-4">
          <div className="flex flex-col gap-3 w-1/2">
            <h3 className="text-white text-4xl font-zentry">
              Reset Your Password
            </h3>
            <p className="text-white text-base">
              Enter your email and we will send you reset instructions.
            </p>
          </div>
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="flex flex-col gap-3 w-1/2"
          >
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              width="100%"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              required={true}
              containerClass="text-black"
            />
            <Button
              title={submitting ? "Sending..." : "Send reset email"}
              disabled={submitting}
              containerClass="w-full bg-violet-300 text-white mt-0"
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
