Feature: Change Rule Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to change a rule in a decision table
So that I can modify conditions and actions for an existing rule in my decision table

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##
Scenario Outline: Change a rule (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> for changing rule
And I have a condition in this table named <con_name> with type <con_type> and values <con_vals> for change rule
And I have an action in this table of type <action_type> named <action_name> with action values: <action_values> for change rule
And I have created a rule in this table with condition <con_name> and condition value <con_num>, and action <action_name> and action value <act_num> for change rule
When I create a new condition in this table named <new_con_name> with type <new_con_type> and values <new_con_vals>
And I create a new action in this table of type <new_action_type> named <new_action_name> with action values: <new_action_values>
And I change the created rule with new condition <new_con_name> and condition value <new_con_num>, and action <new_action_name> and action value <new_act_num>
Then I receive a unique rule identifier for change rule
And created rule has specified condition with value <new_con_num> and action with value <new_act_num> for change rule
And I receive an error code as <rule_response_code> for changing rule
Examples:

| dec_name       | dec_tag | con_name   | con_type   | con_vals                         |  rule_response_code  |  action_name       | action_type   | action_values   | con_num             | act_num          | new_con_name | new_con_type | new_con_vals             | new_action_name | new_action_type | new_action_values | new_con_num         | new_act_num     |
| "RobSab01"     | "dt_1"  | "Region"   | "text"     | "Domestic,International"         |  201                 | "dec_action1"      | "boolean"     | "Ship, No Ship" | "condition-value-1" | "action-value-2" | "Ship"       | "boolean"    | "Go,No Go"               | "dec_action2"   | "text"          | "Ship, No Ship"   | "condition-value-2" | "action-value-1"|
| "RobSab02"     | "dt_2"  | "Ship"     | "boolean"  | "Go,No Go"                       |  201                 | "dec_action2"      | "text"        | "Ship, No Ship" | "condition-value-2" | "action-value-1" | "Weight"     | "numeric"    | "<5,>0"                  | "dec_action3"   | "boolean"       | "Go, No Go"       | "condition-value-1" | "action-value-2"|
| "RobSab03"     | "dt_3"  | "Weight"   | "numeric"  | "<5,>0"                          |  201                 | "dec_action3"      | "boolean"     | "Go, No Go"     | "condition-value-1" | "action-value-2" | "Region"     | "text"       | "Domestic,International" | "dec_action1"   | "boolean"       | "Ship, No Ship"   | "condition-value-1" | "action-value-2"|

Scenario Outline: Invalid condition for rule (Error Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> for changing rule
And I have a condition in this table named <con_name> with type <con_type> and values <con_vals> for change rule
And I have an action in this table of type <action_type> named <action_name> with action values: <action_values> for change rule
And I have created a rule in this table with condition <con_name> and condition value <con_num>, and action <action_name> and action value <act_num> for change rule
When I create a new action in this table of type <new_action_type> named <new_action_name> with action values: <new_action_values>
And I change the created rule with action <new_action_name> and action value <new_act_num> and a non-existent condition
Then I receive an error code as <rule_response_code> for rule creation

Examples:

| dec_name       | dec_tag | con_name   | con_type   | con_vals                         |  rule_response_code  |  action_name       | action_type   | action_values   | con_num             | act_num          | new_action_name | new_action_type | new_action_values | new_act_num     |
| "RobSab01"     | "dt_1"  | "Region"   | "text"     | "Domestic,International"         |  400                 | "dec_action1"      | "boolean"     | "Ship, No Ship" | "condition-value-1" | "action-value-2" | "dec_action2"   | "text"          | "Ship, No Ship"   | "action-value-1"|
| "RobSab02"     | "dt_2"  | "Ship"     | "boolean"  | "Go,No Go"                       |  400                 | "dec_action2"      | "text"        | "Ship, No Ship" | "condition-value-2" | "action-value-1" | "dec_action3"   | "boolean"       | "Go, No Go"       | "action-value-2"|
| "RobSab03"     | "dt_3"  | "Weight"   | "numeric"  | "<5,>0"                          |  400                 | "dec_action3"      | "boolean"     | "Go, No Go"     | "condition-value-1" | "action-value-2" | "dec_action1"   | "boolean"       | "Ship, No Ship"   | "action-value-2"|

Scenario Outline: Invalid action for rule (Error Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> for changing rule
And I have a condition in this table named <con_name> with type <con_type> and values <con_vals> for change rule
And I have an action in this table of type <action_type> named <action_name> with action values: <action_values> for change rule
And I have created a rule in this table with condition <con_name> and condition value <con_num>, and action <action_name> and action value <act_num> for change rule
When I create a new condition in this table named <new_con_name> with type <new_con_type> and values <new_con_vals>
And I change the created rule with action <new_con_name> and action value <new_con_num> and a non-existent action
Then I receive an error code as <rule_response_code> for rule creation

Examples:

| dec_name       | dec_tag | con_name   | con_type   | con_vals                         |  rule_response_code  |  action_name       | action_type   | action_values   | con_num             | act_num          | new_con_name | new_con_type | new_con_vals             | new_con_num         |
| "RobSab01"     | "dt_1"  | "Region"   | "text"     | "Domestic,International"         |  400                 | "dec_action1"      | "boolean"     | "Ship, No Ship" | "condition-value-1" | "action-value-2" | "Ship"       | "boolean"    | "Go,No Go"               | "condition-value-2" |
| "RobSab02"     | "dt_2"  | "Ship"     | "boolean"  | "Go,No Go"                       |  400                 | "dec_action2"      | "text"        | "Ship, No Ship" | "condition-value-2" | "action-value-1" | "Weight"     | "numeric"    | "<5,>0"                  | "condition-value-1" |
| "RobSab03"     | "dt_3"  | "Weight"   | "numeric"  | "<5,>0"                          |  400                 | "dec_action3"      | "boolean"     | "Go, No Go"     | "condition-value-1" | "action-value-2" | "Region"     | "text"       | "Domestic,International" | "condition-value-1" |
