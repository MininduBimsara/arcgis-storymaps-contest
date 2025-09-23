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

  const { login, register, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    // Registration-specific validations
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

      // Optional fields validation
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
        await login(formData.email, formData.password);
        // Redirect will be handled by useEffect when isAuthenticated changes
      } else {
        const registerData = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,
          address: formData.address || undefined,
          city: formData.city || undefined,
        };

        await register(registerData);
        setSuccessMessage(
          "Registration successful! Please check your email to verify your account."
        );
      }
    } catch (error: any) {
      console.error("Auth error:", error);

      if (error.response?.data?.error) {
        setErrors({ general: error.response.data.error });
      } else if (error.error) {
        setErrors({ general: error.error });
      } else if (error.message) {
        setErrors({ general: error.message });
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email: forgotPasswordEmail }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccessMessage(
          "Password reset email sent! Please check your inbox."
        );
        setShowForgotPassword(false);
        setForgotPasswordEmail("");
      } else {
        setErrors({ forgotEmail: data.error || "Failed to send reset email" });
      }
    } catch (error) {
      setErrors({ forgotEmail: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-start pt-30 justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/login.png')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Panel - Welcome Section */}
          <div className="lg:w-1/2 p-2 lg:p-12 flex flex-col justify-start pt-16 bg-gradient-to-br from-blue-600/50 to-blue-800/50 backdrop-blur-sm">
            <div className="text-white">
              <div className="flex items-center mb-5">
                <MapPin className="w-8 h-8 mr-3 text-cyan-300" />
                <span className="text-xl font-semibold">Ceylon Stories</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                WELCOME TO
                <br />
                <span className="text-cyan-300">CEYLON STORIES</span>
              </h1>

              <p className="text-blue-100 text-lg mb-4 leading-relaxed">
                Join the Ceylon Stories 2025 ArcGIS StoryMaps Competition and
                share your unique perspective of Sri Lanka through compelling
                visual narratives and interactive maps.
              </p>

              <div className="space-y-4">
                <div className="flex items-center text-blue-100">
                  <div className="w-2 h-2 bg-cyan-300 rounded-full mr-3"></div>
                  <span>Create interactive story maps</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <div className="w-2 h-2 bg-cyan-300 rounded-full mr-3"></div>
                  <span>Showcase Sri Lankan heritage</span>
                </div>
                <div className="flex items-center text-blue-100">
                  <div className="w-2 h-2 bg-cyan-300 rounded-full mr-3"></div>
                  <span>Win exciting prizes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Auth Form */}
          <div className="lg:w-1/2 p-4 lg:p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-green-100/20 backdrop-blur-sm border border-green-300/20 rounded-xl text-green-800 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-3 text-green-600" />
                  <span className="text-sm">{successMessage}</span>
                </div>
              )}

              {/* Error Message */}
              {errors.general && (
                <div className="mb-6 p-4 bg-red-100/20 backdrop-blur-sm border border-red-300/20 rounded-xl text-red-800 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-3 text-red-600" />
                  <span className="text-sm">{errors.general}</span>
                </div>
              )}

              {showForgotPassword ? (
                /* Forgot Password Form */
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">
                    Reset Password
                  </h2>
                  <form onSubmit={handleForgotPassword} className="space-y-6">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <input
                        type="email"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300"
                        placeholder="Enter your email address"
                        required
                      />
                      {errors.forgotEmail && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.forgotEmail}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
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
                      type="button"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setErrors({});
                        setForgotPasswordEmail("");
                      }}
                      className="w-full text-center text-white/80 hover:text-white transition-colors"
                    >
                      Back to Sign In
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  {/* Toggle Buttons */}
                  <div className="flex mb-8 p-1 bg-white/10 rounded-xl backdrop-blur-sm">
                    <button
                      onClick={() => {
                        setIsLogin(true);
                        setErrors({});
                        setSuccessMessage("");
                      }}
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        isLogin
                          ? "bg-white text-blue-600 shadow-lg"
                          : "text-white hover:bg-white/10"
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
                      className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                        !isLogin
                          ? "bg-white text-blue-600 shadow-lg"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field (Register only) */}
                    {!isLogin && (
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                        <input
                          type="text"
                          name="username"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300"
                          required={!isLogin}
                        />
                        {errors.username && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.username}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Email Field */}
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300"
                        required
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password Fields */}
                    <div className={`${!isLogin ? "flex space-x-4" : ""}`}>
                      <div className="relative flex-1">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                        {errors.password && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      {!isLogin && (
                        <div className="relative flex-1">
                          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300"
                            required={!isLogin}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                          {errors.confirmPassword && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors.confirmPassword}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Optional Fields for Registration */}
                    {!isLogin && (
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number (Optional)"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-4 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-400">
                              {errors.phone}
                            </p>
                          )}
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            name="address"
                            placeholder="Address (Optional)"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full pl-4 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300"
                          />
                        </div>

                        <div className="relative">
                          <input
                            type="text"
                            name="city"
                            placeholder="City (Optional)"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full pl-4 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300"
                          />
                        </div>
                      </div>
                    )}

                    {/* Remember me / Forgot Password */}
                    {isLogin && (
                      <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-white/80">
                          <input
                            type="checkbox"
                            className="mr-2 rounded border-white/20 bg-white/10 text-cyan-300 focus:ring-cyan-300"
                          />
                          Remember me
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-cyan-300 hover:text-cyan-200 transition-colors"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {isLogin ? "Signing In..." : "Creating Account..."}
                        </>
                      ) : isLogin ? (
                        "Sign In"
                      ) : (
                        "Create Account"
                      )}
                    </button>

                    {/* Social Login */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/20"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-transparent text-white/60">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sign {isLogin ? "in" : "up"} with Google
                    </button>
                  </form>
                </>
              )}

              {/* Footer Text */}
              {!showForgotPassword && (
                <div className="text-center mt-8">
                  <p className="text-white/60 text-sm">
                    {isLogin
                      ? "Don't have an account? "
                      : "Already have an account? "}
                    <button
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setErrors({});
                        setSuccessMessage("");
                      }}
                      className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors"
                      disabled={isSubmitting}
                    >
                      {isLogin ? "Sign up" : "Sign in"}
                    </button>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default CeylonStoriesAuth;
