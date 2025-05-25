"use client";

import React, { useState } from "react";
import { useForm, Field } from "@tanstack/react-form";
import { LogIn, UserPlus } from "lucide-react";
import { account, client } from "@/lib/appwriteClient";
import { AppwriteException } from "appwrite";

type FormValues = {
  username: string;
  password: string;
  acceptTerms: boolean;
};

export const Onboarding_AccountForm = ({type}: {type: "create" | "login"}) => {
  const [is, setIsLoad] = useState(false);
  const [returnE, setRE] = useState("");
  
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      acceptTerms: false,
    },
    onSubmit: async ({value}) => {
      if (type === "create") {try {
          setIsLoad(true);
          setRE("");
          const cli = await account.create("unique()", value.email, value.password);
          await account.createEmailPasswordSession(value.email, value.password);

          setIsLoad(false);
        } catch (e) {
          setIsLoad(false);
          if (e instanceof AppwriteException && e.message) {
            setRE(e.message);
          }
        }
      } else if (type === "login") {
        try {
          setIsLoad(true);
          setRE("");
          const cli = await account.createEmailPasswordSession(value.email, value.password);
          setIsLoad(false);
        } catch (e) {
          setIsLoad(false);
          if (e instanceof AppwriteException && e.message) {
            setRE(e.message);
          }
        }
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >   

      <div className="flex flex-row gap-4 mt-6">
        <Field
          name="email"
          form={form}
          validators={{
            onChange: ({ value }) =>
              !value
                ? "An email is required."
                : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email address."
                : undefined,
          }}
        >
          {(field) => (
            <>
              <label className="text-black text-2xl" htmlFor={field.name}>Email:</label>
              <div className="flex flex-col">
                <input
                  className="text-black text-2xl
                    border-0 border-b-2 border-black
                    outline-none
                    appearance-none
                    bg-white
                    focus:ring-0
                    autofill:text-2xl
                    "
                  placeholder="John@gmail.com"
                  id={field.name}
                  type="email"
                  name={field.name}
                  style={{
                    WebkitBoxShadow: "0 0 0px 1000px white inset"
                  }}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <div className="text-start" style={{ color: 'red' }}>{field.state.meta.errors[0]}</div>
                )}
              </div>
              
            </>
          )}
        </Field>

        
      </div>

      <div className="flex flex-row gap-4 mt-6">
        <Field
          name="password"
          form={form}
          validators={{
            onChange: ({ value }) =>
              !value
                ? "A password is required."
                : value.length < 8
                ? "Your password must be greater than 8 characters."
                : undefined,
          }}
        >
          {(field) => (
            <>
              <label className="text-black text-2xl" htmlFor={field.name}>Password:</label>
              <div className="flex flex-col">
                <input
                  className="text-black text-2xl
                    border-0 border-b-2 border-black
                    outline-none
                    appearance-none
                    bg-white
                    focus:ring-0
                    "

                  type="password"
                  id={field.name}
                  name={field.name}
                  style={{
                    WebkitBoxShadow: "0 0 0px 1000px white inset"
                  }}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <div className="text-start" style={{ color: 'red' }}>{field.state.meta.errors[0]}</div>
                )}
              </div>
              
            </>
          )}
        </Field>
      </div>

      <button className="text-black mt-6 text-2xl underline flex flex-row justify-center items-center gap-2" type="submit" disabled={is}>{ type === "create" ? <UserPlus /> : <LogIn /> }{ is ? "Loading..." : type === "create" ? "Get Started" : "Login"}</button>
      <p className="text-black">{returnE}</p>
    </form>
  );
};
