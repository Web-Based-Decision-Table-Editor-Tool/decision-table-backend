Feature: Create Action in Decision Table Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to add an action to a decision table
So that I can use the action to create rules in the decision table

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##

Scenario Outline: Add an action with type boolean to a decision table (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> for adding action
When I add an action of type <type> named <action_name> to decision table with action values: <value1> and <value2>
Then I receive an identifier for the action
And I receive a success code <action_response_code> for create action

Examples:
| dec_name   | dec_tag |  type    | action_name   | value1   | value2    | action_response_code |
| "RobSab01" | "dt_1"  | boolean  | "dec_action1" | "Ship"   | "No Ship" |         201          |
| "RobSab02" | "dt_2"  | boolean  | "dec_action2" | "Go"     | "No Go"   |         201          |

Scenario Outline: Add an action with type boolean to a decison table that does not exist (Error Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And decision table with id <dec_tag> does not exist
When I add an action of type <type> named <action_name> to decision table with invalid id with action values: <value1> and <value2>
Then I receive an action error code as <action_response_code>

Examples:
| dec_tag  |  type    | action_name   | value1   | value2    | action_response_code |
| "dt_12"  | boolean  | "dec_action1" | "Ship"   | "No Ship" |         400          |
| "dt_22"  | boolean  | "dec_action2" | "Go"     | "No Go"   |         400          |

