
Feature: Create Condition Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to create a new condition in a decision table
So that I can add conditions to my decision table accordingly

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##

Scenario Outline: Create a condition (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> with note <dec_note> and id <dec_id>
When I create a condition named <con_name> with type <con_type> and values <con_vals>
Then a condition with a non-null id is created
And the condition named <con_name> with type <con_type> and values <con_vals> is created
And I receive an error code as <con_response_code>

Examples:

| dec_name       | dec_note          | dec_id | con_name | con_type | con_vals                       | con_response_code | Comment             |
| "RobSab01"     | "NoteRS01"        | "dt_1" | Region   | text     | Domestic,International         | 201               | valid condition     |
