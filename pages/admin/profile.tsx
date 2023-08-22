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
import { enqueueSnackbar } from "notistack";

const formInput = [
  {
    label: "First Name",
    field: "firstname",
    type: "text",
  },
  {
    label: "Last Name",
    field: "lastname",
    type: "text",
  },
  {
    label: "Company",
    field: "company",
    type: "text",
  },
  {
    label: "Country",
    field: "country",
    type: "text",
  },
  {
    label: "Street",
    field: "street",
    type: "text",
  },
  {
    label: "City",
    field: "city",
    type: "text",
  },
  {
    label: "Zip Code",
    field: "zip_code",
    type: "number",
  },
  {
    label: "Phone",
    field: "phone",
    type: "text",
  },
  {
    label: "Additional",
    field: "additional",
    type: "text",
  },
];

const infoMutation = {
  success: "Profile has updated!",
  error: "failed update profile!",
};

interface FormInputField {
  label: string;
  field: string;
  type: string;
}

const initialForm = {
  firstname: "",
  lastname: "",
  company: "",
  country: "",
  street: "",
  city: "",
  zip_code: 0,
  phone: "",
  additional: "",
};

export default function Profile() {
  const session = useSession();
  const [showEdit, setShowEdit] = React.useState(false);
  const [form, setForm] = React.useState(initialForm);
  const { data, refetch } = useQuery(GET_PROFILE, {
    fetchPolicy: "cache-and-network",
    variables: {
      filters: {
        users_permissions_user: {
          id: { eq: session.data?.user.id },
        },
      },
    },
    onCompleted: (data) => {
      if (data.profiles.data?.length) {
        let dataForm = data.profiles.data[0].attributes;
        setForm({
          ...form,
          ...{
            firstname: dataForm.firstname,
            lastname: dataForm.lastname,
            company: dataForm.company,
            country: dataForm.country,
            street: dataForm.country,
            city: dataForm.city,
            zip_code: dataForm.zip_code,
            phone: dataForm.phone,
            additional: dataForm.additional,
          },
        });
      }
    },
  });

  const profile = data?.profiles?.data[0]?.attributes;

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
    setShowEdit((prev: boolean) => !prev);
    if (data.profiles?.data?.length) {
      const tempForm = form;
      tempForm.zip_code = parseInt(form.zip_code as unknown as string);

      return updateProfile({
        variables: {
          data: form,
          id: data.profiles.data[0]?.id,
        },
        onCompleted: () => {
          refetch();
          enqueueSnackbar(infoMutation.success, { variant: "success" });
        },
        onError: () => {
          enqueueSnackbar(infoMutation.error, { variant: "error" });
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
      onCompleted: () => {
        refetch();
        enqueueSnackbar(infoMutation.success, { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar(infoMutation.error, { variant: "error" });
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
              <tr className="tw-p-8">
                <td className="tw-py-6 md:tw-w-1/3">{formInput[3].label}</td>
                <td>{profile?.country}</td>
              </tr>
              <tr className="tw-p-8">
                <td className="tw-py-6 md:tw-w-1/3">{formInput[4].label}</td>
                <td>{profile?.street}</td>
              </tr>
              <tr className="tw-p-8">
                <td className="tw-py-6 md:tw-w-1/3">{formInput[5].label}</td>
                <td>{profile?.city}</td>
              </tr>
              <tr className="tw-p-8">
                <td className="tw-py-6 md:tw-w-1/3">{formInput[6].label}</td>
                <td>{profile?.zip_code}</td>
              </tr>
              <tr className="tw-p-8">
                <td className="tw-py-6 md:tw-w-1/3">{formInput[7].label}</td>
                <td>{profile?.phone}</td>
              </tr>
              <tr className="tw-p-8">
                <td className="tw-py-6 md:tw-w-1/3">{formInput[8].label}</td>
                <td>{profile?.additional}</td>
              </tr>
            </tbody>
          </table>
        )}
        {showEdit && (
          <>
            <Stack direction="column" gap={2} className="tw-mb-8 md:tw-w-1/2">
              {formInput.map((input: FormInputField, index: number) => (
                <TextField
                  value={form[input.field as keyof typeof form]}
                  onChange={handleOnChange}
                  key={`input-${index}`}
                  className="tw-f-w-full"
                  name={input.field}
                  label={input.label}
                  type={input.type}
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
