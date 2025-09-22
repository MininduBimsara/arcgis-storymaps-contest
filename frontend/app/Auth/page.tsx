"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, MapPin } from "lucide-react";

const CeylonStoriesAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-white flex items-start pt-30 justify-center ">
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
              {/* Toggle Buttons */}
              <div className="flex mb-8 p-1 bg-white/10 rounded-xl backdrop-blur-sm">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isLogin
                      ? "bg-white text-blue-600 shadow-lg"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
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
              <div className="space-y-6">
                {/* Name Field (Register only) */}
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300"
                      required={!isLogin}
                    />
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
                  </div>

                  {!isLogin && (
                    <div className="relative flex-1">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent transition-all duration-300"
                        required={!isLogin}
                      />
                    </div>
                  )}
                </div>

                

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
                      className="text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-300 shadow-lg"
                >
                  {isLogin ? "Sign In" : "Create Account"}
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
                  className="w-full py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
                >
                  Sign {isLogin ? "in" : "up"} with Google
                </button>
              </div>

              {/* Footer Text */}
              <div className="text-center mt-8">
                <p className="text-white/60 text-sm">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
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
