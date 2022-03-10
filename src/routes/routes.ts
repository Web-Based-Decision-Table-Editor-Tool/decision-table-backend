import { Container } from 'typedi';
import { Router } from "express";
import { decisionTableController } from "../rest-controller/decision-table.controller";
import { actionController } from '../rest-controller/action.controller';
import { conditionController } from '../rest-controller/condition.controller';

// getting an instance of controller (typeDI will inject class dependencies)
const decisionTable = Container.get(decisionTableController);
const action = Container.get(actionController);
const condition = Container.get(conditionController);

// router creation for each concern
const defaultRouter = Router();
const decisionTableRouter = Router();
const actionRouter = Router();
const conditionRouter = Router();

// decision table endpoints
decisionTableRouter.post("/", decisionTable.addTable);
decisionTableRouter.delete("/:id", decisionTable.deleteTable);
decisionTableRouter.put("/", decisionTable.changeTableNameById);
decisionTableRouter.get("/:id", decisionTable.getTableNameById);

// action endpoints
actionRouter.post("/", action.addAction);
actionRouter.get("/:id", action.getActionById);
actionRouter.delete("/:id", action.deleteAction);
actionRouter.put("/", action.updateActionById);

// condition endpoints
conditionRouter.post("/", condition.addCondition);
conditionRouter.get("/", condition.getConditionById);
conditionRouter.delete("/", condition.deleteCondition);
conditionRouter.put("/", condition.updateConditionById);

// router assignments
defaultRouter.use("/table", decisionTableRouter);
defaultRouter.use("/action", actionRouter);
defaultRouter.use("/condition", conditionRouter);

export default defaultRouter;
