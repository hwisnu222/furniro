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

import categories from "@/json/categories.json";

const _renderPanel = (tab: number | string) => {
  switch (tab) {
    case "price": {
      return (
        <Box>
          <Typography className="tw-mb-2 tw-font-bold tw-text-gray-400">
            Price
          </Typography>
          <Box className="tw-flex tw-flex-col tw-gap-2 md:tw-flex-row">
            <TextField type="number" placeholder="lowest" size="small" />
            <TextField type="number" placeholder="highest" size="small" />
          </Box>
        </Box>
      );
    }
    case "category": {
      return (
        <List className="md:tw-w-52">
          {categories.map((category, index) => (
            <ListItem disablePadding key={`list-${index}`}>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary={category.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      );
    }
    default:
      break;
  }
};

export default function Filter() {
  const [anchor, setAnchor] = React.useState<HTMLButtonElement | null>(null);
  const [tab, setTab] = React.useState<string>("category");

  const handleOpenFilter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
  };

  const closeFilter = () => {
    setAnchor(null);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
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
            {_renderPanel(tab)}
          </Box>
        </Box>
        <Box className="tw-flex tw-justify-end tw-p-2">
          <Box className="tw-flex tw-gap-2">
            <Button size="small" onClick={closeFilter}>
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              className="tw-bg-default-200"
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
