const express = require("express")

exports.register = (app) => {
  app.get("/healthcheck", (_, r) => {
    console.log("GET /healthcheck");
    r.status(200).send();
  });

  app.get("/products", (_, r) => {
    console.log("GET /products");
    products = [
      {
        name: "A Pink Shirt",
        imageUrl: "/images/shirt.png",
        size: "XL",
        color: "pink",
      },
      {
        name: "A Black Shirt",
        imageUrl: "/images/shirt.png",
        size: "XL",
        color: "black",
      },
    ];
    r.status(200).send(products);
  });

  app.post("/sessions", (_, r) => {
    console.log("POST /sessions")
    r.send({
      identifier: "12345678-90ab-cdef-1234-567890abcdef",
      email: "arthur.dent@hhgttg.com",
      first_name: "Arthur",
      last_name: "Dent",
      authentication_token: "authtoken",
      preferences :{
        fit: {
          shirt: {
            sizes: {
              accept: ["XL"],
              deny: ["S", "M"],
            },
            colors: {
              deny: [
                "pink",
              ],
            },
          },
        },
      },
    });
  });
};

