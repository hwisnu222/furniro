import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

import { VisibilityOff, Visibility } from "@mui/icons-material";
import AuthLayout from "@/components/layouts/AuthLayout";
import { REGISTER } from "@/graphql/mutations/authentication.mutation";
import { useMutation } from "@apollo/client";
import { enqueueSnackbar } from "notistack";

export default function Register() {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = React.useState<boolean>(false);
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [register] = useMutation(REGISTER);

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleRegisterUser = () => {
    register({
      variables: {
        username: form.username,
        email: form.email,
        password: form.password,
      },
      onCompleted: () => {
        enqueueSnackbar("User is registered!. please login first", {
          variant: "success",
        });

        router.push("/auth/login");
      },
      onError: (error) => {
        console.log(error);
        enqueueSnackbar("failed register user", { variant: "error" });
      },
    });
  };

  const handleVisiblePassword = () => {
    setVisiblePassword((prev: boolean) => !prev);
  };
  return (
    <AuthLayout>
      <form onSubmit={handleRegisterUser}>
        <Box className="tw-flex tw-flex-col  tw-gap-4">
          <Box>
            {" "}
            <Typography variant="h5">Register</Typography>
            <p className="tw-text-gray-400">Please enter your credentials</p>
          </Box>
          <TextField
            label="Username"
            type="text"
            name="username"
            onChange={handleChangeForm}
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            onChange={handleChangeForm}
            required
          />
          <TextField
            label="Password"
            name="password"
            className="tw-mb-8"
            required
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
            type="submit"
          >
            Register
          </Button>
          <p className="tw-text-center tw-text-sm tw-text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="tw-font-bold tw-text-default-200"
            >
              Login
            </Link>
          </p>
        </Box>
      </form>
    </AuthLayout>
  );
}
