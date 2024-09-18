"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { schema } from "./schema";
import { LoginContainer } from "./style";
import { ILoginForm } from "./type";
import { Input, Button } from "@nextui-org/react";
export default function Login() {
  const {
    control,
    handleSubmit,
    trigger,
    resetField,
    formState: { errors },
  } = useForm<ILoginForm>({ resolver: yupResolver(schema) });

  return (
    <LoginContainer>
      <h2>Login</h2>
      <div className="login-form">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input {...field} type="email" label="Email" />
          )}
        />
        <Button>Login</Button>
      </div>
    </LoginContainer>
  );
}
