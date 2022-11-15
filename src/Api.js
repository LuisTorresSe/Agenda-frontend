const urlApi = "/api/agenda/";

export const deleteUser = async (id) => {
  const request = await fetch(`/api/agenda/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "Application/json",
    },
  });
  const response = await request.json();
  return response;
};

export const getUser = async (name) => {
  const request = await fetch(`/api/agenda/${name}`);
  const user = await request.json();
  return user;
};

export const getUserAll = async () => {
  const request = await fetch(urlApi);
  const user = await request.json();
  return user;
};

export const postUser = async (newUser) => {
  const request = await fetch(urlApi, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(newUser),
  });
  const response = await request.json();
  return response;
};
