import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import useMaterialReactTable from "material-react-table";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const fakeData = [
  {
    id: "9s41rp",
    firstName: "Kelvin",
    lastName: "Langosh",
    email: "Jerod14@hotmail.com",
    state: "Ohio",
  },
  {
    id: "08m6rx",
    firstName: "Molly",
    lastName: "Purdy",
    email: "Hugh.Dach79@hotmail.com",
    state: "Rhode Island",
  },
  {
    id: "5ymtrc",
    firstName: "Henry",
    lastName: "Lynch",
    email: "Camden.Macejkovic@yahoo.com",
    state: "California",
  },
  {
    id: "ek5b97",
    firstName: "Glenda",
    lastName: "Douglas",
    email: "Eric0@yahoo.com",
    state: "Montana",
  },
  {
    id: "xxtydd",
    firstName: "Leone",
    lastName: "Williamson",
    email: "Ericka_Mueller52@yahoo.com",
    state: "Colorado",
  },
  {
    id: "wzxj9m",
    firstName: "Mckenna",
    lastName: "Friesen",
    email: "Veda_Feeney@yahoo.com",
    state: "New York",
  },
  {
    id: "21dwtz",
    firstName: "Wyman",
    lastName: "Jast",
    email: "Melvin.Pacocha@yahoo.com",
    state: "Montana",
  },
  {
    id: "o8oe4k",
    firstName: "Janick",
    lastName: "Willms",
    email: "Delfina12@gmail.com",
    state: "Nebraska",
  },
];

// 50 US states array
const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "Puerto Rico",
];

const openDeleteConfirmModal = (row) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    //deleteUser(row.original.id);
  }
};

const handleSaveUsers = () => {};

let isUpdatingUsers = true;
let isLoadingUsers = true;
let isCreatingUser = true;
let isDeletingUser = true;
let isLoadingUsersError = true;
let isFetchingUsers = true;

const TableCRUD = () => {
  const [validationErrors, setValidationErrors] = useState({});
  const [editedUsers, setEditedUsers] = useState({});
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          //   error: !!validationErrors?.[cell.id],
          //   helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          //   onBlur: (event) => {
          //     const validationError = !validateRequired(event.currentTarget.value)
          //       ? 'Required'
          //       : undefined;
          //     setValidationErrors({
          //       ...validationErrors,
          //       [cell.id]: validationError,
          //     });
          //     setEditedUsers({ ...editedUsers, [row.id]: row.original });
          //   },
        }),
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "text",
          required: true,
          //   error: !!validationErrors?.[cell.id],
          //   helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          //   onBlur: (event) => {
          //     const validationError = !validateRequired(event.currentTarget.value)
          //       ? 'Required'
          //       : undefined;
          //     setValidationErrors({
          //       ...validationErrors,
          //       [cell.id]: validationError,
          //     });
          //     setEditedUsers({ ...editedUsers, [row.id]: row.original });
          //   },
        }),
      },
      {
        accessorKey: "email",
        header: "Email",
        muiEditTextFieldProps: ({ cell, row }) => ({
          type: "email",
          required: true,
          //   error: !!validationErrors?.[cell.id],
          //   helperText: validationErrors?.[cell.id],
          //store edited user in state to be saved later
          //   onBlur: (event) => {
          //     const validationError = !validateEmail(event.currentTarget.value)
          //       ? 'Incorrect Email Format'
          //       : undefined;
          //     setValidationErrors({
          //       ...validationErrors,
          //       [cell.id]: validationError,
          //     });
          //     setEditedUsers({ ...editedUsers, [row.id]: row.original });
          //   },
        }),
      },
      {
        accessorKey: "state",
        header: "State",
        editVariant: "select",
        editSelectOptions: usStates,
        muiEditTextFieldProps: ({ row }) => ({
          select: true,
          //   error: !!validationErrors?.state,
          //   helperText: validationErrors?.state,
          onChange: (event) =>
            setEditedUsers({
              ...editedUsers,
              [row.id]: { ...row.original, state: event.target.value },
            }),
        }),
      },
    ],
    [editedUsers, validationErrors]
  );

  const table = useMaterialReactTable({
    columns,
    data: fakeData,
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "table", // ('modal', 'row', 'cell', and 'custom' are also
    enableEditing: true,
    enableRowActions: true,
    positionActionsColumn: "last",
    getRowId: (row) => row.id,
    // muiToolbarAlertBannerProps: isLoadingUsersError
    //   ? {
    //       color: "error",
    //       children: "Error loading data",
    //     }
    //   : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    // onCreatingRowSave: handleCreateUser,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveUsers}
          disabled={
            Object.keys(editedUsers).length === 0 ||
            Object.values(validationErrors).some((error) => !!error)
          }
        >
          {isUpdatingUsers ? <CircularProgress size={25} /> : "Save"}
        </Button>
        {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUsers || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return (
    <div>
      <MaterialReactTable table={table} />;
    </div>
  );
};

export default TableCRUD;
