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

export default function Login() {
  const [visiblePassword, setVisiblePassword] = React.useState<boolean>(false);

  const handleVisiblePassword = () => {
    setVisiblePassword((prev: boolean) => !prev);
  };
  return (
    <AuthLayout>
      <Box className="tw-flex tw-flex-col  tw-gap-4">
        <Box>
          {" "}
          <Typography variant="h5">Login</Typography>
          <p className="tw-text-gray-400">Please enter your credentials</p>
        </Box>
        <TextField label="Email" type="email" />
        <TextField
          label="Password"
          className="tw-mb-8"
          type={visiblePassword ? "text" : "password"}
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
