"use client";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { schema } from "./schema";
import { LoginContainer } from "./style";
import { ILogin } from "./type";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AuthActions } from "@/store/authStore/auth.reducer";
import { useRouter } from "next/navigation";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const defaultValues: DefaultValues<ILogin> = {
    email: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const login: SubmitHandler<ILogin> = (value) => {
    dispatch(
      AuthActions.loginRequest({
        loginForm: value,
        navigate: (userId: string) => {
          router.push(`/loan-list?userId=${userId}`);
          router.refresh();
        },
      })
    );
    reset();
  };

  return (
    <LoginContainer>
      <p className="text-3xl text-center mb-4">Login</p>
      <div className="form-group flex flex-col gap-4 justify-center items-center">
        <FormInput
          control={control}
          name="email"
          label="Email"
          placeholder="Email"
          isInvalid={errors.email?.message ? true : false}
          labelPlacement="outside"
        />
        <small className="text-red-500 align-self-start w-full">
          {errors && errors.email?.message}
        </small>
        <FormInput
          control={control}
          type="password"
          isVisible={false}
          name="password"
          label="Password"
          placeholder="Password"
          labelPlacement="outside"
          isInvalid={errors.password?.message ? true : false}
        />
        <small className="text-red-500 align-self-start w-full">
          {errors && errors.password?.message}
        </small>
        <div className="register-link">
          <Link className="hyperlink" href="/register">
            Register
          </Link>
          &nbsp;to become an admin
        </div>
        <Button onClick={handleSubmit(login)}>Login</Button>
      </div>
    </LoginContainer>
  );
}
