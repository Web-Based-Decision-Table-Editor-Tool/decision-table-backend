import { Container } from 'typedi';
import { Router } from "express";
import { decisionTableController } from "../rest-controller/decision-table.controller";
import { actionController } from '../rest-controller/action.controller';

// getting an instance of controller (typeDI will inject class dependencies)
const decisionTable = Container.get(decisionTableController);
const action = Container.get(actionController);

const defaultRouter = Router();
const decisionTableRouter = Router();
const actionRouter = Router();

decisionTableRouter.post("/", decisionTable.addTable);
decisionTableRouter.delete("/:id", decisionTable.deleteTable);
decisionTableRouter.put("/", decisionTable.changeTableNameById);
decisionTableRouter.get("/:id", decisionTable.getTableNameById);


actionRouter.post("/", action.addAction);
actionRouter.get("/:id", action.getActionById);
actionRouter.delete("/", action.deleteAction);
actionRouter.put("/:id", action.updateActionById);



defaultRouter.use("/table", decisionTableRouter);
defaultRouter.use("/action", actionRouter);


export default defaultRouter;