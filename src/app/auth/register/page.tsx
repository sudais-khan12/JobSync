"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react"
import { useState } from "react"

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email format"),
    password: z
      .string()
      .min(1, "Password is required"),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const password = watch("password")

  const passwordStrength = {
    length: password ? password.length >= 8 : false,
    uppercase: password ? /[A-Z]/.test(password) : false,
    number: password ? /[0-9]/.test(password) : false,
    special: password ? /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) : false,
  }

  const strengthScore = Object.values(passwordStrength).filter(Boolean).length

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true)

    // Simulate API call delay
    setTimeout(() => {
      setIsSubmitting(false)
      // Redirect to login after successful registration
      router.push("/auth/login")
    }, 1000)
  }

  return (
    <div className="h-screen bg-white flex overflow-hidden">
      {/* Left Side - Form Section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-md py-4">
          {/* Logo */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-[#B260E6] to-[#ED84A5] text-white font-bold text-xl shadow-lg">
                J
              </div>
              <span className="font-bold text-3xl bg-gradient-to-r from-[#B260E6] to-[#ED84A5] bg-clip-text text-transparent">
                JobSync
              </span>
            </Link>
            <p className="text-gray-600 mt-2">Australia&apos;s Verified Workforce Platform</p>
          </div>

          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Create your account 🚀
              </CardTitle>
              <p className="text-gray-600">
                Join thousands of skilled professionals finding opportunities across Australia
              </p>
            </CardHeader>

            <CardContent className="space-y-5 p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-3">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className={`h-12 border-gray-200 rounded-xl transition-colors ${
                        errors.name
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "focus:border-[#B260E6] focus:ring-[#B260E6]"
                      }`}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`h-12 border-gray-200 rounded-xl transition-colors ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "focus:border-[#B260E6] focus:ring-[#B260E6]"
                      }`}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className={`h-12 border-gray-200 rounded-xl transition-colors pr-12 ${
                          errors.password
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "focus:border-[#B260E6] focus:ring-[#B260E6]"
                        }`}
                        {...register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}

                    {/* Password Strength Indicator */}
                    {password && (
                      <div className="space-y-1.5 mt-2">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4].map((index) => (
                            <div
                              key={index}
                              className={`h-1 flex-1 rounded-full transition-colors ${
                                index <= strengthScore
                                  ? strengthScore >= 3
                                    ? "bg-green-500"
                                    : strengthScore >= 2
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex items-center space-x-1">
                            <CheckCircle
                              className={`h-3 w-3 ${
                                passwordStrength.length ? "text-green-500" : "text-gray-300"
                              }`}
                            />
                            <span
                              className={
                                passwordStrength.length ? "text-green-600" : "text-gray-500"
                              }
                            >
                              8+ characters
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle
                              className={`h-3 w-3 ${
                                passwordStrength.uppercase ? "text-green-500" : "text-gray-300"
                              }`}
                            />
                            <span
                              className={
                                passwordStrength.uppercase ? "text-green-600" : "text-gray-500"
                              }
                            >
                              Uppercase
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle
                              className={`h-3 w-3 ${
                                passwordStrength.number ? "text-green-500" : "text-gray-300"
                              }`}
                            />
                            <span
                              className={
                                passwordStrength.number ? "text-green-600" : "text-gray-500"
                              }
                            >
                              Number
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle
                              className={`h-3 w-3 ${
                                passwordStrength.special ? "text-green-500" : "text-gray-300"
                              }`}
                            />
                            <span
                              className={
                                passwordStrength.special ? "text-green-600" : "text-gray-500"
                              }
                            >
                              Special char
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className={`h-12 border-gray-200 rounded-xl transition-colors pr-12 ${
                          errors.confirmPassword
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                            : "focus:border-[#B260E6] focus:ring-[#B260E6]"
                        }`}
                        {...register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-[#B260E6] to-[#ED84A5] hover:from-[#A050D6] hover:to-[#DD74A5] text-white rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-gray-500 font-medium">Already have an account?</span>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-[#B260E6] hover:text-[#A050D6] font-semibold transition-colors"
                >
                  Login
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 mb-2">Trusted by Australian workers and employers</p>
            <div className="flex justify-center space-x-6 opacity-60">
              <div className="text-xs text-gray-600">🔒 Secure</div>
              <div className="text-xs text-gray-600">✅ Verified</div>
              <div className="text-xs text-gray-600">🇦🇺 Australian</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-[#B260E6] to-[#ED84A5] overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center px-8 xl:px-12 text-white">
          <div className="max-w-md">
            <div className="mb-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white text-2xl mb-6">
                🚀
              </div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Build Your{" "}
                <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                  Australian Career
                </span>
              </h2>
              <p className="text-xl opacity-90 leading-relaxed">
                Join thousands of skilled professionals finding meaningful work across Australia.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  💼
                </div>
                <div>
                  <h4 className="font-semibold">50,000+ Jobs</h4>
                  <p className="text-sm opacity-80">Active opportunities across Australia</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  🎯
                </div>
                <div>
                  <h4 className="font-semibold">Smart Matching</h4>
                  <p className="text-sm opacity-80">Get matched with jobs that fit your skills</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  📱
                </div>
                <div>
                  <h4 className="font-semibold">Easy Apply</h4>
                  <p className="text-sm opacity-80">One-click applications to save time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

