Feature: Delete Action Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to delete an existing action within my decision table
So that I can remove actions in decision tables that I no longer need when building my applications

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##

Scenario Outline: Delete an action from a decision table (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> for deleting action
And I have created an action named <action_name> of type <type> for deleting action
When I delete the action <action_name>
Then I receive identifier for the deleted action
And I receive an error code for action delete request as <delete_action_response_code>

Examples:

| dec_name  | dec_tag | action_name     | type       | delete_action_response_code | Comment |
| "RobSab01" | "dt_1"  | "booleanTest"  | "boolean"   | 204                  |         |
| "RobSab02" | "dt_2"  | "textTest"     | "text"      | 204                  |         |
| "RobSab03" | "dt_3"  | "numericTest"  | "numeric"   | 204                  |         |
