"use client";
import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  MapPin,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useAuthRedirect } from "@/hooks/useProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface FormData {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
  phone: string;
  address: string;
  city: string;
}

interface FormErrors {
  [key: string]: string;
}

const CeylonStoriesAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  // Use auth context for actual authentication
  const { login, register } = useAuth();
  const router = useRouter();

  // This hook already handles redirect if user is authenticated
  const { isAuthenticated, isLoading } = useAuthRedirect();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
  });

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!isLogin) {
      if (!formData.username) {
        newErrors.username = "Username is required";
      } else if (formData.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters long";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    try {
      if (isLogin) {
        // Use the actual login method from AuthContext
        await login(formData.email, formData.password);
        setSuccessMessage("Login successful! Redirecting...");

        // Redirect to home page after successful login
        setTimeout(() => {
          router.push("/");
        }, 500);
      } else {
        // Use the actual register method from AuthContext
        await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
          address: formData.address || undefined,
          city: formData.city || undefined,
        });

        setSuccessMessage(
          "Registration successful! Please check your email to verify your account."
        );

        // Clear form after successful registration
        setFormData({
          email: "",
          password: "",
          username: "",
          confirmPassword: "",
          phone: "",
          address: "",
          city: "",
        });

        // Optionally redirect after registration
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (error: any) {
      // Handle specific error messages from the API
      const errorMessage =
        error?.error ||
        error?.message ||
        (isLogin
          ? "Login failed. Please check your credentials."
          : "Registration failed. Please try again.");

      setErrors({
        general: errorMessage,
      });

      // Clear success message if there was an error
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotPasswordEmail) {
      setErrors({ forgotEmail: "Email is required" });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotPasswordEmail)) {
      setErrors({ forgotEmail: "Please enter a valid email address" });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // TODO: Call actual forgot password API when implemented
      // await apiService.forgotPassword(forgotPasswordEmail);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccessMessage("Password reset email sent! Please check your inbox.");
      setShowForgotPassword(false);
      setForgotPasswordEmail("");
    } catch (error: any) {
      setErrors({
        forgotEmail:
          error?.error || "Failed to send reset email. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking auth status
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-300" />
      </div>
    );
  }

  // If already authenticated (shouldn't happen due to useAuthRedirect, but as safety)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat "
        style={{
          backgroundImage: "url('/login.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-6xl h-full">
          <div className="bg-white/95 backdrop-blur-sm rounded-md shadow-lg border border-white/20 overflow-hidden h-full">
            <div className="grid md:grid-cols-2 h-full">
              {/* Left Panel */}
              <div
                className="p-10 flex flex-col justify-center relative h-full"
                style={{
                  backgroundImage: "url('/mask.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 text-center">
                  <div className="flex items-center mb-4 justify-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                      <MapPin className="w-4 h-4 text-blue-200" />
                    </div>
                    <span className="text-lg font-medium text-white">
                      Ceylon Stories
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-light text-white mb-4 leading-tight">
                    Welcome to
                    <br />
                    <span className="font-medium text-blue-300">
                      Ceylon Stories
                    </span>
                  </h1>
                  <p className="text-gray-200 text-sm mb-6 leading-relaxed max-w-md mx-auto">
                    Join the Ceylon Stories 2025 ArcGIS StoryMaps Competition
                    and share your unique perspective of Sri Lanka through
                    compelling visual narratives and interactive maps.
                  </p>
                </div>
              </div>

              {/* Right Panel */}
              <div className="p-8 flex flex-col h-full">
                <div className="flex flex-col justify-center h-full">
                  {/* Success Message */}
                  {successMessage && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-800 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm">{successMessage}</span>
                    </div>
                  )}

                  {/* Error Message */}
                  {errors.general && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-800 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2 text-red-600" />
                      <span className="text-sm">{errors.general}</span>
                    </div>
                  )}

                  {showForgotPassword ? (
                    /* Forgot Password Form */
                    <div className="flex flex-col justify-center flex-grow">
                      <h2 className="text-xl font-medium text-black mb-6 text-center">
                        Reset Password
                      </h2>
                      <div className="space-y-4">
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="email"
                            value={forgotPasswordEmail}
                            onChange={(e) =>
                              setForgotPasswordEmail(e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all duration-300"
                            placeholder="Enter your email address"
                            required
                          />
                          {errors.forgotEmail && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.forgotEmail}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={handleForgotPassword}
                          disabled={isSubmitting}
                          className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Send Reset Email"
                          )}
                        </button>

                        <button
                          onClick={() => {
                            setShowForgotPassword(false);
                            setErrors({});
                            setForgotPasswordEmail("");
                          }}
                          className="w-full text-center text-gray-600 hover:text-blue-300 transition-colors text-sm"
                        >
                          Back to Sign In
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-between h-full">
                      <div className="flex-grow">
                        {/* Toggle Buttons */}
                        <div className="flex mb-6 p-1 bg-gray-100 rounded-md">
                          <button
                            onClick={() => {
                              setIsLogin(true);
                              setErrors({});
                              setSuccessMessage("");
                            }}
                            className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-all duration-300 ${
                              isLogin
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-600 hover:text-black"
                            }`}
                          >
                            Sign In
                          </button>
                          <button
                            onClick={() => {
                              setIsLogin(false);
                              setErrors({});
                              setSuccessMessage("");
                            }}
                            className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-all duration-300 ${
                              !isLogin
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-600 hover:text-black"
                            }`}
                          >
                            Sign Up
                          </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                          {/* Username Field (Register only) */}
                          {!isLogin && (
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all duration-300"
                                required={!isLogin}
                              />
                              {errors.username && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.username}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Email Field */}
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                              type="email"
                              name="email"
                              placeholder="Email Address"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all duration-300"
                              required
                            />
                            {errors.email && (
                              <p className="mt-1 text-sm text-red-600">
                                {errors.email}
                              </p>
                            )}
                          </div>

                          {/* Password Fields */}
                          <div
                            className={`${!isLogin ? "grid grid-cols-2 gap-3" : ""}`}
                          >
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all duration-300"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                {showPassword ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                              {errors.password && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.password}
                                </p>
                              )}
                            </div>

                            {!isLogin && (
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  name="confirmPassword"
                                  placeholder="Confirm"
                                  value={formData.confirmPassword}
                                  onChange={handleInputChange}
                                  className="w-full pl-10 pr-10 py-2 bg-white border border-gray-200 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all duration-300"
                                  required={!isLogin}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                  ) : (
                                    <Eye className="w-4 h-4" />
                                  )}
                                </button>
                                {errors.confirmPassword && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.confirmPassword}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Optional Fields for Registration */}
                          {!isLogin && (
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-3">
                                <input
                                  type="tel"
                                  name="phone"
                                  placeholder="Phone (Optional)"
                                  value={formData.phone}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all duration-300"
                                />
                                <input
                                  type="text"
                                  name="city"
                                  placeholder="City (Optional)"
                                  value={formData.city}
                                  onChange={handleInputChange}
                                  className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all duration-300"
                                />
                              </div>
                              <input
                                type="text"
                                name="address"
                                placeholder="Address (Optional)"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-100 transition-all duration-300"
                              />
                              {errors.phone && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.phone}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Remember me / Forgot Password */}
                          {isLogin && (
                            <div className="flex items-center justify-between text-sm">
                              <label className="flex items-center text-gray-600">
                                <input
                                  type="checkbox"
                                  className="mr-2 rounded border-gray-300 text-blue-300 focus:ring-blue-100"
                                />
                                Remember me
                              </label>
                              <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-blue-300 hover:text-blue-200 transition-colors"
                              >
                                Forgot Password?
                              </button>
                            </div>
                          )}

                          {/* Submit Button */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-2"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                {isLogin
                                  ? "Signing In..."
                                  : "Creating Account..."}
                              </>
                            ) : isLogin ? (
                              "Sign In"
                            ) : (
                              "Create Account"
                            )}
                          </button>

                          {/* Divider */}
                          <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                              <span className="px-2 bg-white text-gray-500">
                                Or continue with
                              </span>
                            </div>
                          </div>

                          {/* Google Login */}
                          <button
                            type="button"
                            disabled={isSubmitting}
                            className="w-full py-2 bg-white border border-gray-200 text-black font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Sign {isLogin ? "in" : "up"} with Google
                          </button>
                        </form>
                      </div>

                      {/* Footer Text */}
                      <div className="text-center mt-6 pt-4 border-t border-gray-100">
                        <p className="text-gray-600 text-sm">
                          {isLogin
                            ? "Don't have an account? "
                            : "Already have an account? "}
                          <button
                            onClick={() => {
                              setIsLogin(!isLogin);
                              setErrors({});
                              setSuccessMessage("");
                            }}
                            className="text-blue-300 hover:text-blue-200 font-medium transition-colors"
                            disabled={isSubmitting}
                          >
                            {isLogin ? "Sign up" : "Sign in"}
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeylonStoriesAuth;
