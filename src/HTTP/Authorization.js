import axios from "axios";

export const signUp = (
  email,
  password,
  clientId,
  firstName = null,
  lastName = null
) => {
  axios
    .post(
      "https://sf-final-project.herokuapp.com/api/auth/sign_up",
      {
        email: email,
        password: password,
        clientId: clientId,
        firstName: firstName,
        lastName: lastName,
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
// если не передан в запросе, первому созданному пользователю с конкретным clientId
// будет автоматически присвоено значение true, всем последующим пользователям - false.

export const signIn = (email, password) => {
  axios
    .post(
      "https://sf-final-project.herokuapp.com/api/auth/sign_in",
      {
        email: email,
        password: password,
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

export const auth = () => {
  axios
    .get("https://sf-final-project.herokuapp.com/api/auth/sign_in", {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpZCI6IjYxZTkzZGI0NzgzNTJlNDEzMGUzYTMyNyIsImlhdCI6MTY0MzEwNDUyNywiZXhwIjoxNjQzNzA5MzI3fQX3HFolp1CRVe3AsEXQy6ugZ2zN6XOosNH3etHIkSlaM",
        // {response.data.token}
      },
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error.message));
};
