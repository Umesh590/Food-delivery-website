import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!name || !email || !password || !formData.confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("foodieUsers") || "[]");

      const existingUser = users.find(
        (user) => user.email?.toLowerCase() === email,
      );

      if (existingUser) {
        toast.error("This email is already registered. Please log in.");
        return;
      }

      const newUser = {
        name,
        email,
        password,
      };

      localStorage.setItem("foodieUsers", JSON.stringify([...users, newUser]));

      toast.success("Account created successfully!");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-3 py-5 sm:px-6 sm:py-8">
      <section className="w-full max-w-sm overflow-hidden rounded-2xl border border-orange-100 bg-white p-5 shadow-lg shadow-orange-100/60 sm:max-w-md sm:rounded-3xl sm:p-8">
        {/* Brand */}
        <div className="mb-4 text-center sm:mb-6">
          <div className="mx-auto mb-2.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-2xl shadow-md shadow-orange-200 sm:mb-3 sm:h-14 sm:w-14 sm:text-3xl">
            🍕
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Create <span className="text-orange-500">Account</span>
          </h1>

          <p className="mt-1.5 text-xs text-gray-500 sm:mt-2 sm:text-sm">
            Join Foodie and discover delicious meals.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="register-name"
              className="mb-1 block text-xs font-semibold text-gray-700 sm:mb-1.5 sm:text-sm"
            >
              Full Name
            </label>

            <input
              id="register-name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:px-4 sm:py-3 sm:text-base"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="register-email"
              className="mb-1 block text-xs font-semibold text-gray-700 sm:mb-1.5 sm:text-sm"
            >
              Email Address
            </label>

            <input
              id="register-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:px-4 sm:py-3 sm:text-base"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="register-password"
              className="mb-1 block text-xs font-semibold text-gray-700 sm:mb-1.5 sm:text-sm"
            >
              Password
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100">
              <input
                id="register-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full min-w-0 rounded-xl bg-transparent px-3.5 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:px-4 sm:py-3 sm:text-base"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="shrink-0 px-3 py-2 text-xs font-semibold text-orange-600 hover:text-orange-700 sm:text-sm"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="register-confirm-password"
              className="mb-1 block text-xs font-semibold text-gray-700 sm:mb-1.5 sm:text-sm"
            >
              Confirm Password
            </label>

            <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100">
              <input
                id="register-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full min-w-0 rounded-xl bg-transparent px-3.5 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:px-4 sm:py-3 sm:text-base"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((previous) => !previous)}
                className="shrink-0 px-3 py-2 text-xs font-semibold text-orange-600 hover:text-orange-700 sm:text-sm"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Terms */}
          <label className="flex cursor-pointer items-start gap-2 pt-0.5 text-xs leading-5 text-gray-600 sm:text-sm">
            <input
              type="checkbox"
              required
              className="mt-1 h-3.5 w-3.5 shrink-0 accent-orange-500 sm:h-4 sm:w-4"
            />
            <span>
              I agree to the{" "}
              <span className="font-semibold text-orange-600">
                terms and conditions
              </span>
              .
            </span>
          </label>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-orange-500 py-2.5 text-sm font-bold text-white shadow-md shadow-orange-200 transition duration-200 hover:bg-orange-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:py-3 sm:text-base"
          >
            {isLoading ? "Creating Account..." : "Create My Account"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-xs text-gray-600 sm:mt-6 sm:text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-orange-600 hover:underline"
          >
            Login
          </Link>
        </p>

        <p className="mt-3 text-center text-[10px] text-gray-400 sm:mt-4 sm:text-xs">
          Made with ❤️ for food lovers
        </p>
      </section>
    </main>
  );
};

export default Register;
