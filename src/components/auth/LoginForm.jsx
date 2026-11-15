import Field from "../common/Field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";

function LoginForm() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (FormData) => {
    console.log(FormData);
    const user = { ...FormData };
    setAuth({ user });
    navigate("/");
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
