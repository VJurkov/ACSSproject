import Axios from "axios";

export function callEndPoint(type, url, data) {
  const token = localStorage.getItem("TOKEN");

  switch (type) {
    default:
      Axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  }
}
