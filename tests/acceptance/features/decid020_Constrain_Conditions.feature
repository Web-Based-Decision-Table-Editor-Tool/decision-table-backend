Feature: Constrain Maximum Number of Conditions

As a admininstrator who admininstrates the Decision_Table_Editor_Cloud_Services to build applications
I want to constain the maximum number of rules, actions and conditions in a decision table
To prevent users from creating bloated decision tables

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##
Scenario Outline: Exceed maximum amount of conditions (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> for testing condition constraint
And I have created the maximum amount of conditions allowed
When I create another condition
Then I receive an error code as 404 for creating a condition

Examples:

| dec_name       | dec_tag | con_name   | con_type   | con_vals                         |  rule_response_code  |  action_name       | action_type   | action_values   | con_num             | act_num          | response_code |
| "RobSab01"     | "dt_1"  | "Region"   | "text"     | "Domestic,International"         |  201                 | "dec_action1"      | "boolean"     | "Ship, No Ship" | "condition-value-1" | "action-value-2" |    200        |
| "RobSab02"     | "dt_2"  | "Ship"     | "boolean"  | "Go,No Go"                       |  201                 | "dec_action2"      | "text"        | "Ship, No Ship" | "condition-value-2" | "action-value-1" |    200        |
| "RobSab03"     | "dt_3"  | "Weight"   | "numeric"  | "<5,>0"                          |  201                 | "dec_action3"      | "boolean"     | "Go, No Go"     | "condition-value-1" | "action-value-2" |    200        |

