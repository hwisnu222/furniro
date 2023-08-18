import React from "react";
import { useMutation, useQuery } from "@apollo/client";

import HeaderAdmin from "@/components/headers/HeaderAdmin";
import Container from "@/components/layouts/Container";
import { Edit } from "@mui/icons-material";
import {
  Avatar,
  Typography,
  Stack,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { GET_PROFILE } from "@/graphql/queries/profile.query";
import { useSession } from "next-auth/react";
import {
  ADD_PROFILE,
  UPDATE_PROFILE,
} from "@/graphql/mutations/profile.mutation";
const formInput = [
  {
    label: "First Name",
    field: "firstname",
  },
  {
    label: "Last Name",
    field: "lastname",
  },
  {
    label: "Company",
    field: "company",
  },
  {
    label: "Country",
    field: "country",
  },
  {
    label: "Street",
    field: "street",
  },
  {
    label: "City",
    field: "city",
  },
  {
    label: "Zip Code",
    field: "zip_code",
  },
  {
    label: "Phone",
    field: "phone",
  },
  {
    label: "Additional",
    field: "additional",
  },
];

interface FormInputField {
  label: string;
  field: string;
}

export default function Profile() {
  const session = useSession();
  const [showEdit, setShowEdit] = React.useState(false);
  const [form, setForm] = React.useState({});
  const { data } = useQuery(GET_PROFILE, {
    variables: {
      filters: {
        users_permissions_user: {
          id: { eq: session.data?.user.id },
        },
      },
    },
    onCompleted: (data) => {
      if (data.profile.data) {
        setForm(data.profiles.data[0]);
      }
    },
  });

  const profile = data?.profiles?.data[0].attributes;

  const [createProfile] = useMutation(ADD_PROFILE);
  const [updateProfile] = useMutation(UPDATE_PROFILE);

  const handleShowEdit = () => {
    setShowEdit((prev: boolean) => !prev);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleSaveProfile = () => {
    if (data.profile.data) {
      return updateProfile({
        variables: {
          data: form,
        },
      });
    }

    createProfile({
      variables: {
        data: {
          ...form,
          users_permissions_user: session.data?.user.id,
        },
      },
    });
  };

  return (
    <>
      <HeaderAdmin />
      <Container className="tw-py-8">
        <div className="tw-mb-8 tw-flex tw-h-[200px] tw-items-end tw-justify-center tw-bg-default-200">
          <Avatar className="tw-mb-[-100px] tw-h-52 tw-w-52" />
        </div>

        <Stack
          direction="row"
          gap="4"
          alignItems="center"
          className="tw-mb-8 tw-mt-52"
        >
          <Typography variant="h4">Profile</Typography>
          <IconButton onClick={handleShowEdit}>
            <Edit />
          </IconButton>
        </Stack>

        {!showEdit && (
          <table className="tw-w-full">
            <tbody>
              <tr className="tw-p-8">
                <td className="tw-py-6 md:tw-w-1/3">{formInput[0].label}</td>
                <td>{profile?.firstname}</td>
              </tr>
              <tr className="tw-p-8">
                <td className="tw-py-6 md:tw-w-1/3">{formInput[1].label}</td>
                <td>{profile?.lastname}</td>
              </tr>
              <tr className="tw-p-8">
                <td className="tw-py-6 md:tw-w-1/3">{formInput[2].label}</td>
                <td>{profile?.company}</td>
              </tr>
            </tbody>
          </table>
        )}
        {showEdit && (
          <>
            <Stack direction="column" gap={2} className="tw-mb-8 md:tw-w-1/2">
              {formInput.map((input: FormInputField, index: number) => (
                <TextField
                  value={form[input.field]}
                  onChange={handleOnChange}
                  key={`input-${index}`}
                  className="tw-f-w-full"
                  name={input.field}
                  label={input.label}
                />
              ))}
            </Stack>
            <Button
              variant="contained"
              className="tw-bg-default-200"
              size="large"
              onClick={handleSaveProfile}
            >
              Save
            </Button>
          </>
        )}
      </Container>
    </>
  );
}
