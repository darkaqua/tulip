import { application } from "../../../src/mod";
import { app } from "./app";

application({
  backgroundColor: 0x1d1d1d,
  scale: 3,
}).then(async ({ add2}) => {
  add2(app);
});

