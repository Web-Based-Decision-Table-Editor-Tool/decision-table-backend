@ChangeDecisionTableNameFeature
Feature: Query Action from a Decision Table Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to query the an existing action
So that I can view the action in a decistion table

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##

Scenario Outline: Query an Action Normal Flow / Error Flow

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
And I have created an action of type <type> named <action_name> to decision table with id <dec_tag> with action values: <value1> and <value2>
When I query the action in decision table with id <dec_tag>
Then the returned action should have type <type> and name <action_name> 
And I receive an error code as <action_response_code> for querying an action

Examples:
| dec_name   | dec_tag |  type    | action_name   | value1   | value2    | action_response_code |
| "RobSab01" | "dt_1"  | boolean  | "dec_action1" | "Ship"   | "No Ship" |         200          |
| "RobSab02" | "dt_2"  | boolean  | "dec_action2" | "Go"     | "No Go"   |         200          |
