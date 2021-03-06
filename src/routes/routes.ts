import { Container } from 'typedi';
import { Router } from "express";
import { decisionTableController } from "../rest-controller/decision-table.controller";
import { actionController } from '../rest-controller/action.controller';
import { conditionController } from '../rest-controller/condition.controller';
import { ruleController } from '../rest-controller/rule.controller';

// getting an instance of controller (typeDI will inject class dependencies)
const decisionTable = Container.get(decisionTableController);
const action = Container.get(actionController);
const condition = Container.get(conditionController);
const rule = Container.get(ruleController);

// router creation for each concern
const defaultRouter = Router();
const decisionTableRouter = Router();
const actionRouter = Router();
const conditionRouter = Router();
const ruleRouter = Router();

// decision table endpoints
decisionTableRouter.post("/", decisionTable.addTable);
decisionTableRouter.delete("/:id", decisionTable.deleteTable);
decisionTableRouter.put("/", decisionTable.changeTableNameById);
decisionTableRouter.put("/note", decisionTable.changeTableNoteById);
decisionTableRouter.get("/:id", decisionTable.getTableNameById);
decisionTableRouter.get("/note/:id", decisionTable.getTableNoteById);

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

// rule endpoints
ruleRouter.post("/", rule.addRule);
ruleRouter.get("/", rule.getRuleById);
ruleRouter.delete("/", rule.deleteRuleById);
ruleRouter.put("/", rule.updateRuleById);



// router assignments
defaultRouter.use("/table", decisionTableRouter);
defaultRouter.use("/action", actionRouter);
defaultRouter.use("/condition", conditionRouter);
defaultRouter.use("/rule", ruleRouter);

export default defaultRouter;
