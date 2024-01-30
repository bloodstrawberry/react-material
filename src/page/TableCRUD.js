import React, { useMemo, useState } from "react";
import {
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from "material-react-table";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete'
const data = [
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

const validateRequired = (value) => !!value.length;

const TableCRUD = () => {
  const [validationErrors, setValidationErrors] = useState({});
  //keep track of rows that have been edited
  const [editedUsers, setEditedUsers] = useState({});
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false, // ID는 Edit 금지
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        muiEditTextFieldProps: ({ cell, row }) => ({
            type: 'text',
            required: true,
            // error: false,
            // helperText: true ? "wrong!!" : undefined,
            
            //store edited user in state to be saved later
            onBlur: (event) => {
                console.log(event.currentTarget);
              },
          }),
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "state",
        header: "State",
      },
    ],
    [editedUsers, validationErrors]
  );

  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: 'row', // ('modal', and 'custom' are also available)
    editDisplayMode: 'table', // ('modal', 'row', 'cell', and 'custom' are also
    enableEditing: true,
    
    enableRowActions: true,
    positionActionsColumn: 'last',

    getRowId: (row) => row.id,

    muiTableContainerProps: {
        sx: {
          minHeight: '500px', // 테이블 최소 높이
        },
      },

      onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave:handleCreateUser,

    //Action 버튼 생성
    renderRowActions: ({ row }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),

        //하단 처리
      renderBottomToolbarCustomActions: () => (
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button
            color="success"
            variant="contained"
            onClick={()=>console.log("sex")}
            // disabled={
            //   Object.keys(editedUsers).length === 0 ||
            //   Object.values(validationErrors).some((error) => !!error)
            // }
          >
            {false ? <CircularProgress size={25} /> : 'Save'}
          </Button>
          {Object.values(validationErrors).some((error) => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
        </Box>
      ),

      //Create NEW User 버튼 추가
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
        isLoading: false,
        isSaving: false,
        showAlertBanner: false,
        showProgressBars: false,
      },

  });

  const handleCreateUser = ({ values, table }) => {
    console.log(values, table);
    table.setCreatingRow(null); //exit creating mode
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log(row.original.id);

    }
  };


  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default TableCRUD;
