import React, { useState } from "react";
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

  let columns = [
    {
      accessorKey: "name.firstName", //access nested data with dot notation
      header: "First Name",
      size: 10,
    },
    {
      accessorKey: "name.lastName",
      header: "Last Name",
      size: 10,
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
  ];

  const [columnOrder, setColumnOrder] = useState(
    columns.map((c) => c.accessorKey)
  );

  const ACCESSOR_KEY = "ACCESSOR_KEY";

  const initOrdering = () => {
    let item = localStorage.getItem(ACCESSOR_KEY);

    if (item === null) return columns.map((c) => c.accessorKey);

    let ordering = JSON.parse(item);
    return ordering;
  };

  const handleColumnOrderChange = (value) => {
    setColumnOrder(value);
    console.log(columnOrder);

    console.log(value);

    localStorage.setItem(ACCESSOR_KEY, JSON.stringify([...value]));
  };

  return (
    <div>
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
        muiTableBodyProps={{
          sx: {
            "& tr:nth-of-type(odd)": {
              backgroundColor: "skyblue",
            },
          },
        }}
        columns={columns}
        initialState={{
          columnOrder: initOrdering,
        }}
        data={data}
        enablePinning
        enableColumnOrdering
        onColumnOrderChange={handleColumnOrderChange}
      />
    </div>
  );
};

export default MaterialTable;
