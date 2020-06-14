import Axios from "axios";

export async function callEndPoint(type, url, data) {
  const token = localStorage.getItem("TOKEN");

  switch (type) {
    case "POST": {
      return Axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    default:
      return Axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
  }
}
