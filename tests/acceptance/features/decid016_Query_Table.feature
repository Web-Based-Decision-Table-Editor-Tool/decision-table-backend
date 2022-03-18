@QueryRuleFeature
Feature: Query Rule from a Decision Table Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to query the an existing rule
So that I can view the rule in a decistion table

Acceptance Tests

## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##

Scenario Outline: Query a Condition Normal Flow / Error Flow

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
And I have created a condition of type <condition_type> named <condition_name> to decision table with id <dec_tag> with condition values: <condition_value1> and <condition_value2>
And I have added an action of type <action_type> named <action_name> to decision table with id <dec_tag> with action values: <action_value1> and <action_value2>
And I have added a rule associating condition named <condition_name> and it's value <condition_value1> to action named <action_name> and it's value <action_value_1> 
When I query the created rule in decision table with id <dec_tag>
Then the returned rule should have id matching created name
And I receive an error code as <response_code> for querying a condition

Examples:
| dec_name   | dec_tag |  condition_type    | condition_name   | condition_value1   |  condition_value2   |   action_type    |  action_value1  |  action_value 2  |       response_code     |
| "RobSab01" | "dt_1"  |      boolean       | "dec_cond1"      |      "Local"       |   "International"   |    boolean       |   "Ship"        |   "Don't Ship"   |           200           |  
| "RobSab02" | "dt_2"  |      boolean       | "dec_cond2"      |      "Open"        |   "Closed"          |    boolean       |   "Pour"        |   "Don't Pour    |           200           |
