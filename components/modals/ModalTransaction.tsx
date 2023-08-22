import { CartItem } from "@/interfaces/cart.interface";
import { TransactionItem } from "@/interfaces/transaction.interface";
import { Modal, Box, Typography, Divider, Stack } from "@mui/material";
import React from "react";
import Image from "../images/Image";
import { formatDate } from "@/utils/date";

export default function ModalTransaction({
  transaction,
  children,
}: {
  transaction: TransactionItem;
  children?: React.ReactNode;
}) {
  console.log({ transaction });
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box onClick={handleOpen}>{children}</Box>
      {/* <IconButton onClick={handleOpen}>{children}</IconButton> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="tw-p-4 md:tw-p-20"
      >
        <Box className="tw-inline-block tw-h-full tw-w-full tw-overflow-x-auto tw-rounded-md tw-bg-white">
          <Typography variant="h5" className=" tw-p-4">
            Transaction Detail
          </Typography>
          <Divider />
          <Box className="tw-grid tw-grid-cols-2 tw-p-4">
            <Stack gap={2}>
              {transaction.attributes.carts.data.map(
                (cart: CartItem, index: number) => {
                  const attributes = cart.attributes;
                  return (
                    <Box key={`cart-${index}`} className="tw-flex tw-gap-4">
                      <Image
                        src={
                          attributes.product.data.attributes.image.data[0]
                            .attributes.url
                        }
                        className="tw-h-24 tw-w-24 tw-object-cover"
                        alt="cart-thumbnail"
                      />
                      <Box>
                        <Typography className="tw-text-lg">
                          {attributes.product.data.attributes.name}
                        </Typography>
                        <Typography className="tw-text-sm tw-text-gray-600">
                          Total {attributes.total}
                        </Typography>
                      </Box>
                    </Box>
                  );
                },
              )}
            </Stack>
            <Box>
              <table>
                <tbody>
                  <tr>
                    <td className="tw-pb-2 tw-pr-4">Status</td>
                    <td>: {transaction.attributes.status}</td>
                  </tr>
                  <tr>
                    <td className="tw-pb-2 tw-pr-4">Transaction create</td>
                    <td>: {formatDate(transaction.attributes.createdAt)}</td>
                  </tr>
                  <tr>
                    <td className="tw-pb-2 tw-pr-4">Buyer</td>
                    <td>
                      :{" "}
                      {
                        transaction.attributes.users_permissions_user.data
                          ?.attributes.profile.data.attributes.firstname
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
