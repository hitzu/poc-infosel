import ip from "ip";
import app from "./app";

app.listen(3000, () => {
  console.log(`API REST corriendo en http://${ip.address()}:${3000}/`)
});