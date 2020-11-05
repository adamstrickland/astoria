const express = require("express")
const _ = require("lodash")
const faker = require("faker")

exports.register = (app) => {
  app.get("/healthcheck", (_, r) => {
    console.log("GET /healthcheck");
    r.status(200).send();
  });

  app.get("/products", (_q, r) => {
    console.log("GET /products");

    const colors = [
      "red", "yellow", "blue", "black", "pink", "white",
    ];
    const sizes = [
      "S", "M", "L", "XL",
    ];
    const lines = [
      "Riveria",
      "Technical",
      "Golf",
      "Wacky",
    ];
    const cartesian = (...a) => a.reduce((a, b) => _.flatMap(a, d => b.map(e => _.flatten([d, e]))));
    const shirts = cartesian(colors, sizes, lines).map((perm) => {
      [c, s, l] = perm;
      const name = `The ${l} Shirt`;
      return {
        name: name,
        imageUrl: "/images/shirt.png",
        size: s,
        color: c,
        type: "shirt",
        line: l.toLowerCase(),
        description: faker.commerce.productDescription(),
        slug: [name, s, c].map(s => s.toLowerCase()).join("-").replace(/\s/g, '-'),
      };
    });

    const randomizer = () => {
      const ord = Math.floor(Math.random() * Math.floor(3));
      const offset = -1;
      return ord - offset;
    };

    const products = [...shirts].sort(randomizer);


    r.status(200).send(products);
  });

  app.post("/sessions", (_q, r) => {
    console.log("POST /sessions")
    r.send({
      identifier: "12345678-90ab-cdef-1234-567890abcdef",
      email: "arthur.dent@hhgttg.com",
      first_name: "Arthur",
      last_name: "Dent",
      authentication_token: "authtoken",
      fit: {
        shirt: {
          size: "XL",
        },
      },
      preferences: {
        like: {
          colors: ["blue"],
        },
        dislike: {
          colors: ["pink"],
        },
      },
    });
  });
};

