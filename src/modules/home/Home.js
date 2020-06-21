import React from "react";
import Carousel from "react-material-ui-carousel";
import HomeItem from "./components/HomeItem";

function Home() {
  var items = [
    {
      name: "",
      src: "https://i.postimg.cc/FFd5RvDD/Black-smoke.jpg",
    },
    {
      name: "",
      src: "https://i.postimg.cc/8zbx3zzP/Getty-Images-464804196.jpg",
    },
    {
      name: "",
      src: "https://i.postimg.cc/1z5bZ180/Getty-Images-522149997.jpg",
    },
  ];

  return (
    <Carousel>
      {items.map((item) => (
        <HomeItem item={item} />
      ))}
    </Carousel>
  );
}

export default Home;
