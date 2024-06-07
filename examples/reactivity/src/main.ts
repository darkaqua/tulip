import { application } from "../../../src/mod";
import { app } from "./app";

application({
  backgroundColor: 0xeff4f8,
  scale: 3,
}).then(async ({ add2}) => {
  add2(app);
});

