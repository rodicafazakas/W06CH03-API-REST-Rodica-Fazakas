require("dotenv").config();
const inquirer = require("inquirer");
require("./database/index");

const initializeServer = require("./server/index");

const port = process.env.SERVER_PORT || 5000;

(async () => {
  const answers = await inquirer.prompt([
    {
      name: "puerte",
      type: "input",
      message: "¿En qué puerto quieres que se inicie la API?",
      default: 4000,
    },
    {
      name: "database",
      type: "list",
      message: "¿Qué base de datos quieres usar?",
      choices: [
        {
          name: "Prueba",
        },
        {
          name: "Produccion",
        },
      ],
      default: "Prueba",
    },
    {
      name: "action",
      type: "confirm",
      message: "¿Quieres permitir que los clientes puedan crear, borrar y modificar?",
      default: true,
    },
  ]);
  console.log(answers);
  initializeServer(port);
})();
