import io from "./socket_server";
import server from "./server";
io(server);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
});

export = server;
