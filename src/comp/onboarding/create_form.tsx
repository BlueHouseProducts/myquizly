"use client";

import React, { useState } from "react";
import { useForm, Field } from "@tanstack/react-form";
import { LogIn, UserPlus, Loader2 } from "lucide-react";
import { account } from "@/lib/appwriteClient";
import { AppwriteException } from "appwrite";

type FormValues = {
  email: string;
  password: string;
  acceptTerms: boolean;
};

export const Onboarding_AccountForm = ({ type }: { type: "create" | "login" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      acceptTerms: false,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      setErrorMsg("");

      try {
        if (type === "create") {
          await account.create("unique()", value.email, value.password);
          await account.createEmailPasswordSession(value.email, value.password);
        } else {
          await account.createEmailPasswordSession(value.email, value.password);
        }

        window.location.href = "/app/dashboard"; // Redirect after successful login/creation
      } catch (e) {
        if (e instanceof AppwriteException && e.message) {
          setErrorMsg(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <h2 className="text-3xl font-semibold text-center text-gray-800">
        {type === "create" ? "Create Account" : "Login"}
      </h2>

      {/* Email Field */}
      <Field
        name="email"
        form={form}
        validators={{
          onChange: ({ value }) =>
            !value
              ? "An email is required."
              : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
              ? "Invalid email address."
              : undefined,
        }}
      >
        {(field) => (
          <div className="flex flex-col space-y-1">
            <label htmlFor={field.name} className="text-gray-700 font-medium">
              Email
            </label>
            <input
              id={field.name}
              type="email"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              style={{
                WebkitBoxShadow: "0 0 0px 1000px white inset",
              }}
            />
            <div className="min-h-[1.25rem] text-sm text-red-500">{field.state.meta.errors[0]}</div>
          </div>
        )}
      </Field>

      {/* Password Field */}
      <Field
        name="password"
        form={form}
        validators={{
          onChange: ({ value }) =>
            !value
              ? "A password is required."
              : value.length < 8
              ? "Password must be at least 8 characters."
              : undefined,
        }}
      >
        {(field) => (
          <div className="flex flex-col space-y-1">
            <label htmlFor={field.name} className="text-gray-700 font-medium">
              Password
            </label>
            <input
              id={field.name}
              type="password"
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              style={{
                WebkitBoxShadow: "0 0 0px 1000px white inset",
              }}
            />
            <div className="min-h-[1.25rem] text-sm text-red-500">{field.state.meta.errors[0]}</div>
          </div>
        )}
      </Field>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="animate-spin w-5 h-5" />
        ) : type === "create" ? (
          <UserPlus className="w-5 h-5" />
        ) : (
          <LogIn className="w-5 h-5" />
        )}
        {isLoading ? "Please wait..." : type === "create" ? "Sign Up" : "Login"}
      </button>

      {/* Global Error Message */}
      {errorMsg && (
        <p className="text-center text-red-500 text-sm mt-2">{errorMsg}</p>
      )}
    </form>
  );
};
