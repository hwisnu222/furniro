import React from "react";

import HeaderCard from "@/components/headers/HeaderCard";
import DashboardLayout from "@/components/layouts/DashboardAdminLayout";

import {
  Table,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Divider,
  Box,
  Pagination,
  IconButton,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CONTACT } from "@/graphql/queries/contact.query";
import { ContactItem } from "@/interfaces/contact.interface";
import { formatDate } from "@/utils/date";
import { DELETE_CONTACT } from "@/graphql/mutations/contact.mutation";
import { enqueueSnackbar } from "notistack";
import { Delete } from "@mui/icons-material";

export default function List() {
  const [page, setpage] = React.useState(0);

  const [deleteContact] = useMutation(DELETE_CONTACT);

  const { data, refetch } = useQuery(GET_CONTACT, {
    variables: {
      pagination: {
        page,
        pageSize: 10,
      },
    },
  });
  const contacts = data?.contacts.data;
  const meta = data?.contacts.meta;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setpage(value);
  };

  const handleDeleteContact = (id: number) => {
    deleteContact({
      variables: {
        id,
      },
      onCompleted: () => {
        refetch();
        enqueueSnackbar("Contact has deleted!", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar("Failed delete contact!", { variant: "error" });
      },
    });
  };

  return (
    <div>
      <DashboardLayout>
        <HeaderCard title="Contacts" />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Email Address</TableCell>
                <TableCell align="right">Subject</TableCell>
                <TableCell align="right">Message</TableCell>
                <TableCell align="right">Create At</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts?.map((contact: ContactItem, index: number) => {
                const attributes = contact.attributes;
                return (
                  <TableRow
                    key={`row-${index}`}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{attributes.name}</TableCell>
                    <TableCell align="right">{attributes.email}</TableCell>
                    <TableCell align="right">{attributes.subject}</TableCell>
                    <TableCell align="right">{attributes.message}</TableCell>
                    <TableCell align="right">
                      {formatDate(attributes.createdAt)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <Box className="tw-flex tw-justify-end tw-py-4">
          <Pagination
            showFirstButton
            showLastButton
            onChange={handleChangePage}
            count={Math.floor(
              meta?.pagination.total / meta?.pagination.pageSize,
            )}
            page={page}
          />
        </Box>
      </DashboardLayout>
    </div>
  );
}
