/* global BigInt */
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const ERROR_CODE = "Error";

const isValidIPv4 = (ipv4) => {
  const pattern = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
  const parts = ipv4.match(pattern);

  if (!parts) {
    return false;
  }

  for (let i = 1; i <= 4; i++) {
    const octet = parseInt(parts[i], 10);
    if (octet < 0 || octet > 255 || (octet === 0 && parts[i].length > 1)) {
      return false;
    }
  }

  return true;
};

const isValidIPv6 = (ipv6) => {
  const pattern= /^(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}$/;  
  return pattern.test(ipv6);
}

const isValidIPv6Short = (ipv6) => {
  const pattern = /^(([A-Fa-f0-9]{1,4}:){1,7}|:)((:[A-Fa-f0-9]{1,4}){1,7}|:)$/;
  return pattern.test(ipv6);
}

const integerToIpv4 = (value) => {
  let maxValue = 4294967295;
  let integer = Number(value);

  if (isNaN(integer) === true || integer < 0 || integer > maxValue) {
    return ERROR_CODE;
  }

  return (
    ((integer >> 24) & 0xff) + "." +
    ((integer >> 16) & 0xff) + "." +
    ((integer >> 8) & 0xff) + "." +
    (integer & 0xff)
  );
};

const ipv4ToInteger = (ipv4) => {
  if(isValidIPv4(ipv4) === false) return ERROR_CODE; 

  const octets = ipv4.split('.').map(Number); 
  return (octets[0] * 256 ** 3) + (octets[1] * 256 ** 2) + (octets[2] * 256 ** 1) + (octets[3] * 256 ** 0);
};

const integerToIpv6 = (value) => {
  let integer;
  try {
    integer = BigInt(value);
  } catch (e) {
    return ERROR_CODE;
  }

  let maxValue = BigInt(340282366920938463463374607431768211455);
  if (integer < 0 || integer > maxValue) return ERROR_CODE;

  let hexString = integer.toString(16);
  while (hexString.length < 32) {
    hexString = "0" + hexString;
  }

  const parts = [];
  for (let i = 0; i < 8; i++) {
    parts.push(hexString.slice(i * 4, (i + 1) * 4));
  }

  return parts.join(":");
};

const ipv6ToInteger = (ipv6) => {
  if(isValidIPv6(ipv6) === false) return ERROR_CODE; 

  const parts = ipv6.split(':');
  
  let result = BigInt(0);
  for (let i = 0; i < parts.length; i++) {
    result = (result << BigInt(16)) + BigInt("0x" + parts[i]);
  }

  return String(result);
};

const ipv6LongToShort = (ipv6) => {
  if(isValidIPv6(ipv6) === false) return ERROR_CODE;

  const blocks = ipv6.split(":");

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i] === "0000") {
      blocks[i] = "";
    }
  }

  return blocks.join(":").replace(/:{3,}/g, "::");
};

const ipv6ShortToLong = (ipv6) => {
  if(isValidIPv6Short(ipv6) === false) return ERROR_CODE;
  let blocks = ipv6.split(':');

  if (blocks.length === 8) {
    return ipv6; 
  }

  let index = blocks.indexOf('');

  blocks.splice(index, 1, ...Array(8 - blocks.length + 1).fill('0'));

  let expandedIPv6 = blocks.map(block => {
    while (block.length < 4) {
      block = '0' + block;
    }
    return block;
  }).join(':'); 

  return expandedIPv6;
}

const deleteFrontZero = (str) => {
  if (str === "0") return str;
  return str.replace(/^0+/, "");
};

const IPConverter = () => {
  const [info, setInfo] = useState({
    integer: "0",
    ipv4: "0.0.0.0",
    ipv6_short: "::",
    ipv6_long: "0000:0000:0000:0000:0000:0000:0000:0000",
  });

  const changeInteger = (value) => {
    let ipv6 = integerToIpv6(value);

    setInfo({
      integer: deleteFrontZero(String(value)),
      ipv4: integerToIpv4(value),
      ipv6_short: ipv6LongToShort(ipv6),
      ipv6_long: ipv6,
    });
  };

  const changeIpv4 = (value) => {
    let integer = ipv4ToInteger(value);
    let ipv6 = integerToIpv6(integer);

    setInfo({
      integer: integer,
      ipv4: value,
      ipv6_short: ipv6LongToShort(ipv6),
      ipv6_long: ipv6,
    });
  };

  const changeIpv6Short = (value) => {
    let ipv6Long = ipv6ShortToLong(value);    
    let bigInteger = ipv6ToInteger(ipv6Long);

    setInfo({
      integer: bigInteger,
      ipv4: integerToIpv4(bigInteger),
      ipv6_short: value,
      ipv6_long: ipv6Long,
    });
  }

  const changeIpv6Long = (value) => {
    let bigInteger = ipv6ToInteger(value);

    setInfo({
      integer: bigInteger,
      ipv4: integerToIpv4(bigInteger),
      ipv6_short: ipv6LongToShort(value),
      ipv6_long: value,
    });
  }

  return (
    <div>
      <Box
        component="form"
        sx={{ m: 5, display: "flex", flexDirection: "column", width: "800px" }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ marginBottom: 3 }}
          color={info.integer === ERROR_CODE ? "error" : "primary"}
          focused
          error={false}
          label="Integer"
          value={info.integer}
          onChange={(e) => changeInteger(e.target.value)}
        />
        <TextField
          sx={{ marginBottom: 3 }}
          color={info.ipv4 === ERROR_CODE ? "error" : "primary"}
          focused
          error={false}
          label="IPv4"
          value={info.ipv4}
          onChange={(e) => changeIpv4(e.target.value)}
        />
        <TextField
          sx={{ marginBottom: 3 }}
          color={info.ipv6_short === ERROR_CODE ? "error" : "success"}
          focused
          error={false}
          label="IPv6 (short)"
          value={info.ipv6_short}
          onChange={(e) => changeIpv6Short(e.target.value)}
        />
        <TextField
          sx={{ marginBottom: 3 }}
          color={info.ipv6_long === ERROR_CODE ? "error" : "success"}
          focused
          error={false}
          label="Ipv6 (long)"
          value={info.ipv6_long}
          onChange={(e) => changeIpv6Long(e.target.value)}
        />
      </Box>
    </div>
  );
};

export default IPConverter;
