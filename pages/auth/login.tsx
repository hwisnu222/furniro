import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";

import { VisibilityOff, Visibility } from "@mui/icons-material";
import AuthLayout from "@/components/layouts/AuthLayout";
import { signIn } from "next-auth/react";

export default function Login() {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [visiblePassword, setVisiblePassword] = React.useState<boolean>(false);

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleVisiblePassword = () => {
    setVisiblePassword((prev: boolean) => !prev);
  };

  const handleSubmit = async () => {
    console.log(form);
    await signIn("credentials", {
      username: form.email,
      password: form.password,
      callbackUrl: "/admin/product/list",
    });
  };
  return (
    <AuthLayout>
      <Box className="tw-flex tw-flex-col  tw-gap-4">
        <Box>
          <Typography variant="h5">Login</Typography>
          <p className="tw-text-gray-400">Please enter your credentials</p>
        </Box>
        <TextField
          name="email"
          label="Email"
          type="email"
          onChange={handleChangeForm}
        />
        <TextField
          name="password"
          label="Password"
          className="tw-mb-8"
          type={visiblePassword ? "text" : "password"}
          onChange={handleChangeForm}
          InputProps={{
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={handleVisiblePassword}
                className="tw-cursor-pointer"
              >
                {visiblePassword ? <VisibilityOff /> : <Visibility />}
              </InputAdornment>
            ),
          }}
        />
        <Button
          size="large"
          variant="contained"
          className="tw-block tw-w-full tw-bg-default-200"
          onClick={handleSubmit}
        >
          Login
        </Button>
        <p className="tw-text-center tw-text-sm tw-text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="tw-font-bold tw-text-default-200"
          >
            Register
          </Link>
        </p>
      </Box>
    </AuthLayout>
  );
}
