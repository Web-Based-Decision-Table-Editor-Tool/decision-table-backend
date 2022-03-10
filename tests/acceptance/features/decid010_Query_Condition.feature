@ChangeDecisionTableNameFeature
Feature: Query Condition from a Decision Table Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to query the an existing condition
So that I can view the condition in a decistion table

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##

Scenario Outline: Query a Condition Normal Flow / Error Flow

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
And I have created a condition of type <type> named <condition_name> to decision table with id <dec_tag> with condition values: <value1> and <value2>
When I query the condition in decision table with id <dec_tag>
Then the returned condition should have type <type> and name <condition_name> 
And I receive an error code as <condition_response_code> for querying a condition

Examples:
| dec_name   | dec_tag |  type    | condition_name   | value1   | value2          | condition_response_code |
| "RobSab01" | "dt_1"  | boolean  | "dec_cond1"      | "Local"  | "International" |         200             |
| "RobSab02" | "dt_2"  | boolean  | "dec_cond2"      | "Open"   | "Closed"        |         200             |
