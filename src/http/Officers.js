import axios from "axios";

// export const createOfficer = (
//   email,
//   password,
//   firstName = null,
//   lastName = null,
//   approved = false
// ) => {
//   axios
//     .post(
//       "https://sf-final-project.herokuapp.com/api/officers",
//       {
//         email: email,
//         password: password,
//         firstName: firstName,
//         lastName: lastName,
//         approved: approved,
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

// export const updateOfficer = (
//   password = null,
//   firstName = null,
//   lastName = null,
//   approved = false,
//   id
// ) => {
//   axios
//     .put(
//       "https://sf-final-project.herokuapp.com/api/officers/:id",
//       {
//         password: password,
//         firstName: firstName,
//         lastName: lastName,
//         approved: approved,
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

// export const deleteOfficer = (id) => {
//   axios
//     .delete("https://sf-final-project.herokuapp.com/api/officers/:id", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6IjYxZTkzZGI0NzgzNTJlNDEzMGUzYTMyNyIsImlhdCI6MTY0MzEwNDUyNywiZXhwIjoxNjQzNzA5MzI3fQX3HFolp1CRVe3AsEXQy6ugZ2zN6XOosNH3etHIkSlaM",
//       },
//     })
//     .catch((error) => console.log(error.message));
// };

// export const getAllOfficers = () => {
//   axios
//     .get("https://sf-final-project.herokuapp.com/api/officers/", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6IjYxZTkzZGI0NzgzNTJlNDEzMGUzYTMyNyIsImlhdCI6MTY0MzEwNDUyNywiZXhwIjoxNjQzNzA5MzI3fQX3HFolp1CRVe3AsEXQy6ugZ2zN6XOosNH3etHIkSlaM",
//       },
//     })
//     .catch((error) => console.log(error.message));
// };

// export const getOfficer = (id) => {
//   axios
//     .get("https://sf-final-project.herokuapp.com/api/officers/:id", {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6IjYxZTkzZGI0NzgzNTJlNDEzMGUzYTMyNyIsImlhdCI6MTY0MzEwNDUyNywiZXhwIjoxNjQzNzA5MzI3fQX3HFolp1CRVe3AsEXQy6ugZ2zN6XOosNH3etHIkSlaM",
//       },
//     })
//     .then((response) => console.log(response))
//     .catch((error) => console.log(error.message));
// };
