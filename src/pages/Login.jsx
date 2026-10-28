import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { dataContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(dataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("foodieUsers") || "[]");

      const registeredUser = users.find(
        (user) =>
          user.email?.toLowerCase() === normalizedEmail &&
          user.password === password,
      );

      if (!registeredUser) {
        toast.error("Invalid email or password. Please try again.");
        return;
      }

      loginUser(
        {
          name: registeredUser.name,
          email: registeredUser.email,
        },
        rememberMe,
      );

      toast.success(`Welcome back, ${registeredUser.name}!`);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unable to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-3 py-6 sm:px-6 sm:py-10">
      <section className="w-full max-w-sm overflow-hidden rounded-2xl border border-orange-100 bg-white p-5 shadow-lg shadow-orange-100/60 sm:max-w-md sm:rounded-3xl sm:p-8">
        {/* Brand */}
        <div className="mb-5 text-center sm:mb-7">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-2xl shadow-md shadow-orange-200 sm:h-14 sm:w-14 sm:text-3xl">
            🍔
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Welcome <span className="text-orange-500">Back!</span>
          </h1>

          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            Sign in to enjoy your favourite food.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="login-email"
              className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm"
            >
              Email Address
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:px-4 sm:py-3 sm:text-base"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="login-password"
              className="mb-1.5 block text-xs font-semibold text-gray-700 sm:text-sm"
            >
              Password
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full min-w-0 rounded-xl bg-transparent px-3.5 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:px-4 sm:py-3 sm:text-base"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="shrink-0 px-3 py-2 text-xs font-semibold text-orange-600 transition hover:text-orange-700 sm:text-sm"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-2 pt-0.5 text-xs sm:text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-3.5 w-3.5 accent-orange-500 sm:h-4 sm:w-4"
              />
              Remember me
            </label>

            <button
              type="button"
              onClick={() =>
                toast.info("Password recovery is not configured yet.")
              }
              className="font-semibold text-orange-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-orange-500 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition duration-200 hover:bg-orange-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:py-3 sm:text-base"
          >
            {isLoading ? "Logging in..." : "Login to Your Account"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-5 text-center text-xs text-gray-600 sm:mt-6 sm:text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-orange-600 hover:underline"
          >
            Create Account
          </Link>
        </p>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3 sm:my-5">
          <div className="h-px flex-1 bg-gray-100" />
          <span className="text-[10px] text-gray-400 sm:text-xs">OR</span>
          <div className="h-px flex-1 bg-gray-100" />
        </div>

        <p className="mt-4 text-center text-[10px] text-gray-400 sm:text-xs">
          Made with ❤️ for food lovers
        </p>
      </section>
    </main>
  );
};

export default Login;
