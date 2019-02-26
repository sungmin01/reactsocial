import axios from "axios";

//get

export const getList = () => {
  return axios
    .get("https://reactsocialnode.herokuapp.com/api/posts", {
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      return res.data;
    });
};

//put

export const updateItem = (term, id) => {
  return axios
    .put(
      `http://localhost:5000/api/task/${id}`,
      {
        title: term,
        isDone: false
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(function(response) {
      console.log(response);
    });
};
