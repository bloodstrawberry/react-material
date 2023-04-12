import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: "John",
      lastName: "Doe",
    },
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    name: {
      firstName: "Jane",
      lastName: "Doe",
    },
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Joe",
      lastName: "Doe",
    },
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Vandy",
    },
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Joshua",
      lastName: "Rolluffs",
    },
    address: "32188 Larkin Turnpike",
    city: "Charleston",
    state: "South Carolina",
  },
];

const MaterialTable = () => {
  const makeBlue = (city, name) => {
    if (name === "Doe") return <span style={{ color: "blue" }}>{city}</span>;
    return city;
  };

  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "First Name",
        size: 200,
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
      },
      {
        accessorKey: "city",
        header: "City",
        Cell: ({ renderedCellValue, row }) =>
          makeBlue(renderedCellValue, row._valuesCache["name.lastName"]),
      },
      {
        accessorKey: "state",
        header: "State",
        Cell: ({ renderedCellValue }) => {
          return <span style={{ color: "red" }}>{renderedCellValue}</span>;
        },
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: "yellow",
          BorderStyle: "solid",
          borderWidth: "1px 0px 1px 0px",
          borderColor: "black black black black",
        },
      }}
      muiTablePaperProps={{
        elevation: 10, // shadow effect
        sx: {
          margin: "0 auto",
          width: "80%",
          border: "1px solid black",
        },
      }}
      columns={columns}
      data={data}
      enablePinning
    />
  );
};

export default MaterialTable;
