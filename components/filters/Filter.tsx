import React from "react";
import {
  Button,
  Popover,
  Typography,
  Box,
  TextField,
  Tabs,
  Tab,
  ListItemButton,
  ListItemText,
  ListItem,
  List,
} from "@mui/material";

import { TuneOutlined } from "@mui/icons-material";

import { GET_CATEGORY } from "@/graphql/queries/product.query";
import { CategoryProduct } from "@/interfaces/categoryProduct.interface";
import { useQuery } from "@apollo/client";

// const _renderPanel = (tab: number | string) => {
//   switch (tab) {
//     case "price": {
//       return (
//         <Box>
//           <Typography className="tw-mb-2 tw-font-bold tw-text-gray-400">
//             Price
//           </Typography>
//           <Box className="tw-flex tw-flex-col tw-gap-2 md:tw-flex-row">
//             <TextField type="number" placeholder="lowest" size="small" />
//             <TextField type="number" placeholder="highest" size="small" />
//           </Box>
//         </Box>
//       );
//     }
//     case "category": {
//       return (

//       );
//     }
//     default:
//       break;
//   }
// };

export default function Filter({ onApply }: { onApply: Function }) {
  const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
  const [tab, setTab] = React.useState<string>("category");
  const [highPrice, setHighPrice] = React.useState("");
  const [lowPrice, setLowPrice] = React.useState("");
  const [category, setCategory] = React.useState("");

  const { data } = useQuery(GET_CATEGORY);

  const handleOpenFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };
  const applyFilter = () => {
    const filterPrice =
      lowPrice || highPrice
        ? {
            gte: parseInt(lowPrice) || 0,
            lte: parseInt(highPrice) || 0,
          }
        : {};

    const filterCategory = category
      ? {
          eq: category,
        }
      : {};
    onApply({
      price: filterPrice,
      category: {
        category: filterCategory,
      },
    });
    closeFilter();
  };

  const closeFilter = () => {
    setAnchor(null);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const resetFilter = () => {
    setHighPrice("");
    setLowPrice("");
    setCategory("");
  };
  return (
    <>
      <Button
        aria-describedby="popover"
        startIcon={<TuneOutlined />}
        className="tw-text-[16px] tw-capitalize tw-text-black"
        onClick={handleOpenFilter}
      >
        Filter
      </Button>
      <Popover
        id="popover"
        onClose={closeFilter}
        open={Boolean(anchor)}
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box className="tw-flex tw-h-72">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tab}
            onChange={handleChangeTab}
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Category" value="category" />
            <Tab label="Price" value="price" />
          </Tabs>
          <Box className="tw-overflow-y-auto tw-bg-default-100 tw-p-4">
            {tab === "price" && (
              <Box>
                <Typography className="tw-mb-2 tw-font-bold tw-text-gray-400">
                  Price
                </Typography>
                <Box className="tw-flex tw-flex-col tw-gap-2 md:tw-flex-row">
                  <TextField
                    type="number"
                    placeholder="lowest"
                    size="small"
                    value={lowPrice}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setLowPrice(event?.target.value)
                    }
                  />
                  <TextField
                    type="number"
                    placeholder="highest"
                    size="small"
                    value={highPrice}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setHighPrice(event?.target.value)
                    }
                  />
                </Box>
              </Box>
            )}

            {tab === "category" && (
              <List className="md:tw-w-52">
                {data?.categories.data?.map(
                  (item: CategoryProduct, index: number) => (
                    <ListItem disablePadding key={`list-${index}`}>
                      <ListItemButton
                        component="a"
                        selected={category === item.attributes.category}
                        onClick={() => setCategory(item.attributes.category)}
                      >
                        <ListItemText primary={item.attributes.category} />
                      </ListItemButton>
                    </ListItem>
                  ),
                )}
              </List>
            )}
          </Box>
        </Box>
        <Box className="tw-flex tw-justify-between tw-p-2">
          <Button size="small" onClick={resetFilter}>
            Reset
          </Button>
          <Box className="tw-flex tw-gap-2">
            <Button size="small" onClick={closeFilter}>
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              className="tw-bg-default-200"
              onClick={applyFilter}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
