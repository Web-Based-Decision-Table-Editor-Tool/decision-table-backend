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
And I have created the maximum amount of action allowed
When I create another condition
And I create another action
Then I receive an error code as <condition_response_code> for creating a condition
Then I receive an error code as <action_response_code> for creating a action

Examples:

| dec_name       | condition_response_code  | action_response_code    |
| "RobSab01"     |     404                  |           400           |
| "RobSab02"     |     404                  |           400           |
| "RobSab03"     |     404                  |           400           |

