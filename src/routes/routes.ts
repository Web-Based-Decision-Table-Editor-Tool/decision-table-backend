import { Container } from 'typedi';
import { Router } from "express";
import { decisionTableController } from "../rest-controller/decision-table.controller";
import { actionController } from '../rest-controller/action.controller';
import { conditionController } from '../rest-controller/condition.controller';
import { settingsController } from '../rest-controller/settings.controller';

// getting an instance of controller (typeDI will inject class dependencies)
const decisionTable = Container.get(decisionTableController);
const action = Container.get(actionController);
const condition = Container.get(conditionController);
const settings = Container.get(settingsController);


// router creation for each concern
const defaultRouter = Router();
const decisionTableRouter = Router();
const actionRouter = Router();
const conditionRouter = Router();
const settingsRouter = Router();


// decision table endpoints
decisionTableRouter.post("/", decisionTable.addTable);
decisionTableRouter.delete("/:id", decisionTable.deleteTable);
decisionTableRouter.put("/", decisionTable.changeTableNameById);
decisionTableRouter.put("/note", decisionTable.changeTableNoteById);
decisionTableRouter.get("/:id", decisionTable.getTableNameById);

// action endpoints
actionRouter.post("/", action.addAction);
actionRouter.get("/:id", action.getActionById);
actionRouter.delete("/", action.deleteAction);
actionRouter.put("/", action.updateActionById);

// condition endpoints
conditionRouter.post("/", condition.addCondition);
conditionRouter.get("/", condition.getConditionById);
conditionRouter.delete("/", condition.deleteCondition);
conditionRouter.put("/", condition.updateConditionById);

// setting endpoints
settingsRouter.post("/tables/:maxTables", settings.setMaxTables);
settingsRouter.post("/rules/:maxRules");
settingsRouter.post("/conditions/:maxConditions");
settingsRouter.post("/actions/:maxActions");
settingsRouter.get("/");


// router assignments
defaultRouter.use("/table", decisionTableRouter);
defaultRouter.use("/action", actionRouter);
defaultRouter.use("/condition", conditionRouter);
defaultRouter.use("/settings", settingsRouter);

export default defaultRouter;
