import { Router } from "express";
import { decisionTableController } from "../rest-controller/decision-table.controller";

const decisionTable = new decisionTableController();

const defaultRouter = Router();
const decisionTableRouter = Router();

decisionTableRouter.post("/", decisionTable.addTable);
decisionTableRouter.delete("/:id", decisionTable.deleteTable);
decisionTableRouter.put("/", decisionTable.changeTableNameById);

//decisionTableRouter.get("/", decisionTable.getTable);

defaultRouter.use("/table", decisionTableRouter);
// defaultRouter.use("/action", actionRouter);


export default defaultRouter;