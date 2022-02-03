import { v4 as uuid } from "uuid";

export const USER = {
  email: "name@mail.ru",
  password: 123456,
  clientId: "your-client-id",
  authorization: "",
};

export const OFFICERS = [
  {
    email: "name@mail.ru",
    clientId: "your-client-id",
    firstName: "John",
    lastName: "Smoth",
    approved: true,
    password: 123,
    id: uuid(),
  },
  {
    email: "name@mail.ru",
    clientId: "your-client-id",
    firstName: "Nick",
    lastName: "Smith",
    approved: true,
    password: 7853,
    id: uuid(),
  },
  {
    email: "name@mail.ru",
    clientId: "your-client-id",
    firstName: "Sarah",
    lastName: "Anderson",
    approved: true,
    password: 98652,
    id: uuid(),
  },
];

export const CASES = [
  {
    ownerFullName: "John Doe",
    licenseNumber: "56y34gwrtgrt",
    type: "sport",
    color: "blue",
    description: "was stolen jnfjdmiofjiskifdjfiskdieokwejneojqejwmds",
    id: uuid(),
  },
  {
    ownerFullName: "Nastya Swan",
    licenseNumber: "589516",
    type: "sport",
    color: "red",
    officer: `${OFFICERS[0].firstName} ${OFFICERS[0].lastName}`,
    description:
      "was stolen jnfjdmiofjiskifdjfiskdieokwejneojqejwmdscccccccccccccccccc",
    id: uuid(),
  },
  {
    ownerFullName: "Anna Cray",
    licenseNumber: "58988777",
    type: "general",
    color: "black",
    officer: `${OFFICERS[2].firstName} ${OFFICERS[2].lastName}`,
    description: "was stolen jnfjdmiofjiskifdjfiskdieokwejneojqejwmds",
    id: uuid(),
  },
  {
    ownerFullName: "sdsdw Cray",
    licenseNumber: "589887sdsdsd77",
    type: "general",
    color: "black",
    officer: `${OFFICERS[1].firstName} ${OFFICERS[1].lastName}`,
    description: "was stolen jnfjdmiofjiskisdsdsfdjfiskdieokwejneojqejwmds",
    id: uuid(),
  },
];
