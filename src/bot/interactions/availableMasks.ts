const currentYear = new Date().getFullYear();
const daysInMonth = (month: number) =>
  new Date(currentYear, month, 0).getDate();

const IPv4ElementExp =
  /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

export const dateMask = (value: any) => [
  {
    length: [1, 2],
    options: Array.from({ length: 12 }, (v, k) => k + 1),
    regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
    placeholder: "mm",
  },
  { fixed: "/" },
  {
    length: [1, 2],
    options: Array.from(
      {
        length: daysInMonth(parseInt((value as any).split("/")[0], 10)),
      },
      (v, k) => k + 1
    ),
    regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
    placeholder: "dd",
  },
  { fixed: "/" },
  {
    length: 4,
    options: Array.from({ length: 100 }, (v, k) => currentYear - k),
    regexp:
      /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
    placeholder: "yyyy",
  },
];

export const dateRangeMask = (value: any) => [
  {
    length: [1, 2],
    options: Array.from({ length: 12 }, (v, k) => k + 1),
    regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
    placeholder: "mm",
  },
  { fixed: "/" },
  {
    length: [1, 2],
    options: Array.from(
      {
        length: daysInMonth(parseInt(value.split("/")[0], 10)),
      },
      (v, k) => k + 1
    ),
    regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
    placeholder: "dd",
  },
  { fixed: "/" },
  {
    length: 4,
    options: Array.from({ length: 100 }, (v, k) => currentYear - k),
    regexp:
      /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
    placeholder: "yyyy",
  },
  { fixed: " - " },
  {
    length: [1, 2],
    options: Array.from({ length: 12 }, (v, k) => k + 1),
    regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
    placeholder: "mm",
  },
  { fixed: "/" },
  {
    length: [1, 2],
    options: Array.from(
      {
        length: daysInMonth(parseInt(value.split("/")[0], 10)),
      },
      (v, k) => k + 1
    ),
    regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
    placeholder: "dd",
  },
  { fixed: "/" },
  {
    length: 4,
    options: Array.from({ length: 100 }, (v, k) => currentYear - k),
    regexp:
      /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
    placeholder: "yyyy",
  },
];

export const ipv4Mask = () => [
  {
    length: [1, 3],
    regexp: IPv4ElementExp,
    placeholder: "xxx",
  },
  { fixed: "." },
  {
    length: [1, 3],
    regexp: IPv4ElementExp,
    placeholder: "xxx",
  },
  { fixed: "." },
  {
    length: [1, 3],
    regexp: IPv4ElementExp,
    placeholder: "xxx",
  },
  { fixed: "." },
  {
    length: [1, 3],
    regexp: IPv4ElementExp,
    placeholder: "xxx",
  },
];

export const urlMask = () => [{ fixed: "https://" }, { regexp: /^.*$/ }];

export const timeMask = () => [
  {
    length: [1, 2],
    options: Array.from({ length: 12 }, (v, k) => k + 1),
    regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
    placeholder: "hh",
  },
  { fixed: ":" },
  {
    length: 2,
    options: ["00", "15", "30", "45"],
    regexp: /^[0-5][0-9]$|^[0-9]$/,
    placeholder: "mm",
  },
  { fixed: " " },
  {
    length: 2,
    options: ["am", "pm"],
    regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
    placeholder: "ap",
  },
];

export const dateTimeMask = (value: any) => [
  {
    length: [1, 2],
    options: Array.from({ length: 12 }, (v, k) => k + 1),
    regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
    placeholder: "mm",
  },
  { fixed: "/" },
  {
    length: [1, 2],
    options: Array.from(
      {
        length: daysInMonth(parseInt((value as any).split("/")[0], 10)),
      },
      (v, k) => k + 1
    ),
    regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
    placeholder: "dd",
  },
  { fixed: "/" },
  {
    length: 4,
    options: Array.from({ length: 100 }, (v, k) => currentYear - k),
    regexp:
      /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
    placeholder: "yyyy",
  },
  { fixed: "," },
  {
    length: [1, 2],
    options: Array.from({ length: 12 }, (v, k) => k + 1),
    regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
    placeholder: "hh",
  },
  { fixed: ":" },
  {
    length: 2,
    options: ["00", "15", "30", "45"],
    regexp: /^[0-5][0-9]$|^[0-9]$/,
    placeholder: "mm",
  },
  { fixed: " " },
  {
    length: 2,
    options: ["am", "pm"],
    regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
    placeholder: "ap",
  },
];

export const ValidateMask = {
  dateMask: (val: string) =>
    val.length >= 8 &&
    val.split("/").length === 3 &&
    val.split("/")[2].length === 4,
  dateRangeMask: (val: string) =>
    val.length >= 19 &&
    val.split("/").length === 5 &&
    val.split("-").length === 2 &&
    val.split("/")[4].length === 4,
  ipv4Mask: (val: string) => val.length >= 6 && val.split(".").length === 4,
  urlMask: (val: string) => val.startsWith("https://") && val.length >= 10,
  timeMask: (val: string) => val.length >= 7,
  dateTimeMask: (val: string) =>
    val.length >= 15 &&
    val.split("/").length === 3 &&
    val.split("/")[2].length === 4 &&
    val.split(":").length === 2,
};
