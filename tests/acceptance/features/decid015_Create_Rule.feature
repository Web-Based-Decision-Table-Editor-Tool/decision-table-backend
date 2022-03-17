Feature: Create Rule Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to create a new rule in a decision table
So that I can add rules which link conditions and actions in my decision table

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##
Scenario Outline: Create a rule (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> for adding rule
And I have a condition in this table named <con_name> with type <con_type> and values <con_vals>
And I have an action in this table of type <action_type> named <action_name> with action values: <action_values>
When I create a rule in this table with condition <con_name> and condition value <con_num>, and action <action_name> and action value <act_num>
Then I receive a unique rule identifier
And created rule has specified condition with value <con_num> and action with value <act_num>
And I receive an error code as <rule_response_code> for rule creation

Examples:

| dec_name       | dec_tag | con_name   | con_type   | con_vals                         |  rule_response_code  |  action_name       | action_type   | action_values   | con_num             | act_num          |
| "RobSab01"     | "dt_1"  | "Region"   | "text"     | "Domestic,International"         |  201                 | "dec_action1"      | "boolean"     | "Ship, No Ship" | "condition-value-1" | "action-value-2" | 
| "RobSab02"     | "dt_2"  | "Ship"     | "boolean"  | "Go,No Go"                       |  201                 | "dec_action2"      | "text"        | "Ship, No Ship" | "condition-value-2" | "action-value-1" |
| "RobSab03"     | "dt_3"  | "Weight"   | "numeric"  | "<5,>0"                          |  201                 | "dec_action3"      | "boolean"     | "Go, No Go"     | "condition-value-1" | "action-value-2" |

Scenario Outline: Invalid condition for rule (Error Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
When I create a rule in this table with condition that does not exist
Then I receive an error code as <rule_response_code> for rule creation
Examples:

| dec_name       | dec_tag | rule_response_code| Comment                 |
| "RobSab01"     | "dt_4"  | 400               | non existing condition  |

Scenario Outline: Invalid condition for rule (Error Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
When I create a rule in this table with action that does not exist
Then I receive an error code as <rule_response_code> for rule creation
Examples:

| dec_name       | dec_tag | rule_response_code| Comment                 |
| "RobSab01"     | "dt_5"  | 400               | non existing action     |
