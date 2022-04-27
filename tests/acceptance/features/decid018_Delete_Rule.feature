Feature: Query Rule from a Decision Table Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to query the an existing rule
So that I can view the rule in a decistion table

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##
Scenario Outline: Query a rule (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> for deleting rule
And I have a condition in this table named <con_name> with type <con_type> and values <con_vals> for deleting rule
And I have an action in this table of type <action_type> named <action_name> with action values: <action_values> for deleting rule
And I have created a rule in this table with condition <con_name> and condition value <con_num>, and action <action_name> and action value <act_num> for deleting rule
When I delete the created rule 
Then I recieve the id of the deleted rule
And I receive an error code as <response_code> for deleting rule

Examples:

| dec_name       | dec_tag | con_name   | con_type   | con_vals                         |  rule_response_code  |  action_name       | action_type   | action_values   | con_num             | act_num          | response_code |
| "RobSab01"     | "dt_1"  | "Region"   | "text"     | "Domestic,International"         |  201                 | "dec_action1"      | "boolean"     | "Ship, No Ship" | "condition-value-1" | "action-value-2" |    200        |
| "RobSab02"     | "dt_2"  | "Ship"     | "boolean"  | "Go,No Go"                       |  201                 | "dec_action2"      | "text"        | "Ship, No Ship" | "condition-value-2" | "action-value-1" |    200        |
| "RobSab03"     | "dt_3"  | "Weight"   | "numeric"  | "<5,>0"                          |  201                 | "dec_action3"      | "boolean"     | "Go, No Go"     | "condition-value-1" | "action-value-2" |    200        |

