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

Scenario Outline: Delete an action (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named "TestTable" identified as "dt_01" 
And I have created an action in it named <action_name> identified as <action_tag>
When I delete the action <action_name>
Then I receive identifier deleted as tag <action_tag>
And I receive an error code for action delete request as <action_response_code>

Examples:

action_name |  action_tag  | action_response_code | Comment             |
