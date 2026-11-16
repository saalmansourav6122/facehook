import Field from "../common/Field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (FormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        FormData,
      );

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;

          console.log(`Login time auth token: ${authToken}`);
          setAuth({ user, authToken, refreshToken });
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("root.random", {
        type: "random",
        message: `User with email ${FormData.email} not found. Please check your credentials and try again.`,
      });
    }
  };

  return (
    <form
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
      onSubmit={handleSubmit(submitForm)}
    >
      <Field label="Email" error={errors.email}>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", { required: "Email is required" })}
          className={`auth-input ${!!errors.email ? "border-red-500" : "border-gray-200"}`}
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
          className={`auth-input ${!!errors.password ? "border-red-500" : "border-gray-200"}`}
        />
      </Field>
      <p className="text-red-500">{errors?.root?.random?.message}</p>

      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Register
        </button>
      </Field>
    </form>
  );
}

export default LoginForm;
