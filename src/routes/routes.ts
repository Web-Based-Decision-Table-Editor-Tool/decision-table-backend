import { Container } from 'typedi';
import { Router } from "express";
import { decisionTableController } from "../rest-controller/decision-table.controller";

// getting an instance of controller (typeDI will inject class dependencies)
const decisionTable = Container.get(decisionTableController);

const defaultRouter = Router();
const decisionTableRouter = Router();

decisionTableRouter.post("/", decisionTable.addTable);
decisionTableRouter.delete("/:id", decisionTable.deleteTable);
decisionTableRouter.put("/", decisionTable.changeTableNameById);
decisionTableRouter.get("/:id", decisionTable.getTableNameById);

//decisionTableRouter.get("/", decisionTable.getTable);

defaultRouter.use("/table", decisionTableRouter);
// defaultRouter.use("/action", actionRouter);


export default defaultRouter;