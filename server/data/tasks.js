const { fetchID } = require("../functions/fetch-functions");

const tasks = {
  pending: {
    title: "pending",
    items: [
      {
        id: fetchID(),

        title: "Provide the proposed designs",

        comments: [],
      },
    ],
  },
  ongoing: {
    title: "ongoing",
    items: [
      {
        id: fetchID(),
        title: "Refine and finalise the designs",
        comments: [
          {
            name: "John",
            text: "Verify designs for copyright issues",
            id: fetchID(),
          },
        ],
      },
    ],
  },
  completed: {
    title: "completed",
    items: [
      {
        id: fetchID(),
        title: "Create posters",
        comments: [
          {
            name: "Doe",
            text: "Check the dimensions",
            id: fetchID(),
          },
        ],
      },
    ],
  },
};

module.exports = { tasks };
