import axios from "axios";
import {
  fetchCasesRequest,
  fetchCasesSuccess,
  fetchCasesFailure,
} from "../store/actions";

export const createCasePublic = (
  licenseNumber,
  ownerFullName,
  type,
  clientId,
  color = null,
  date = null,
  description = null
) => {
  axios
    .post(
      "https://sf-final-project.herokuapp.com/api/public/report",
      {
        licenseNumber: licenseNumber,
        ownerFullName: ownerFullName,
        type: type,
        color: color,
        date: date,
        description: description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => console.log(response))
    .catch((error) => console.log(error.message));
};

// export const editCase = (
//   status = "new",
//   licenseNumber = null,
//   ownerFullName = null,
//   type = null,
//   color = null,
//   date = null,
//   officer = null,
//   description = null,
//   resolution = null,
//   id
// ) => {
//   axios
//     .put(
//       "https://sf-final-project.herokuapp.com/api/cases/:id",
//       {
//         status: status,
//         licenseNumber: licenseNumber,
//         ownerFullName: ownerFullName,
//         type: type,
//         color: color,
//         date: date,
//         officer: officer,
//         description: description,
//         resolution: resolution,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6IjYxZTkzZGI0NzgzNTJlNDEzMGUzYTMyNyIsImlhdCI6MTY0MzEwNDUyNywiZXhwIjoxNjQzNzA5MzI3fQX3HFolp1CRVe3AsEXQy6ugZ2zN6XOosNH3etHIkSlaM",
//         },
//       }
//     )
//     .then((response) => console.log(response))
//     .catch((error) => console.log(error.message));
// };

// export const deleteCase = (id) => {
//   axios
//     .delete("https://sf-final-project.herokuapp.com/api/cases/:id", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6IjYxZTkzZGI0NzgzNTJlNDEzMGUzYTMyNyIsImlhdCI6MTY0MzEwNDUyNywiZXhwIjoxNjQzNzA5MzI3fQX3HFolp1CRVe3AsEXQy6ugZ2zN6XOosNH3etHIkSlaM",
//       },
//     })
//     .catch((error) => console.log(error.message));
// };

// export const getOneCase = (id) => {
//   axios
//     .get("https://sf-final-project.herokuapp.com/api/cases/:id", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6IjYxZTkzZGI0NzgzNTJlNDEzMGUzYTMyNyIsImlhdCI6MTY0MzEwNDUyNywiZXhwIjoxNjQzNzA5MzI3fQX3HFolp1CRVe3AsEXQy6ugZ2zN6XOosNH3etHIkSlaM",
//       },
//     })
//     .then((response) => console.log(response))
//     .catch((error) => console.log(error.message));
// };
