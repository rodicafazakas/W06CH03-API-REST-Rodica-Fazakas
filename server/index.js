const chalk = require("chalk");
const debug = require("debug")("learnings:server");
const express = require("express");
const morgan = require("morgan");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");
const learningsRoutes = require("./routes/learningsRoutes");

const app = express();


const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Escuchando en el puerto ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("Ha habido un error al iniciar el servidor."));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`El puerto ${port} está en uso.`));
    }
  });
};

app.use(morgan("dev"));
app.use(express.json());

app.use((req, res, next) => {
  debug("Soy el segundo middleware");
  next();
});

app.use("/learnings", learningsRoutes);

app.use((req, res, next) => {
  debug("He llegado hasta aquí");
  next();
});

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = initializeServer;
