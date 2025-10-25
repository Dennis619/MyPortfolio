import React, { useState } from "react";
import InputField from "./InputField.jsx";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import api from "./api.jsx";
import { useSnackbar } from "./Context/SnackbarContext.jsx";
import Navbar from "./Navbar.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //snackbar options
  const { showSnackbar } = useSnackbar();

  const handleLogIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return showSnackbar("Please fill all fields", "error");
    }

    setLoading(true);
    try {
      const { data } = await api.post("/users-login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("isLoggedIn", "true");

      showSnackbar("Logged in!", "success");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.error || "Login failed, please try again.";
      showSnackbar(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-black">
      <div className="mx-3 md:mx-10 h-dvh flex flex-col items-center justify-center gap-5 w-full">
        <Navbar />
        <div className="flex flex-col gap-3 justify-center">
          <h3 className="text-white text-2xl">Log In</h3>

          <form
            onClick={handleLogIn}
            className="flex justify-center items-center"
          >
            <div className="flex flex-col gap-3">
              <InputField
                placeholder="Email"
                type="email"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                containerClass="w-full text-black"
                required={true}
              />
              <InputField
                placeholder="Password"
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                containerClass="w-full text-black"
                required={true}
              />
              <Button
                id="register-button"
                title={loading ? "Logging in..." : "Log In"}
                disabled={loading}
                containerClass="w-full bg-violet-300 md:w-3/4 text-white mt-0"
              />
            </div>
          </form>

          <a href="/forgot-password" className="text-violet-300">
            Forgot Password?
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
