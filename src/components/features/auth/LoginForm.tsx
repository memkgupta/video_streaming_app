"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/schemas/auth.schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useSonner,toast } from "sonner";

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const {login} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const nextUrl = searchParams.get("next");

  const onSubmit = async (data: LoginSchema) => {
    setServerError(null);
    try {
      console.log("Login attempt with:", data);
     const loginTry =await login(data)
     if(loginTry)
     {
     toast.success("Login successfull")
        if (nextUrl) {
        router.replace(nextUrl);
      }
      else{
        router.replace("/account")
      }
     }
 
   
    } catch (error) {
      setServerError("An error occurred during login. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white border border-gray-200 text-gray-900 shadow-md rounded-2xl p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <p className="text-sm text-gray-500">Access your account</p>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="bg-white border-gray-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="bg-white border-gray-300"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {serverError && (
            <p className="text-red-500 text-sm">{serverError}</p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>

          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-indigo-600 hover:underline font-medium"
            >
              Register
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
