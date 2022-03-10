@ChangeDecisionTableNameFeature
Feature: Delete Condition Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to delete an existing condition of a decision table
So that I can remove rules I no longer need.





Acceptance Tests


Scenario Outline: Change a condition (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag> for condition delete
And I have created a condition named <con_name> with type <con_type> and values <con_vals> for this table for condition delete
When I delete the condition <con_name> with id <con_id>
Then I receive identifier deleted as tag <con_name> for condition delete
And I receive an error code as <con_response_code> for condition delete


Examples:

| dec_name       | dec_note          | dec_tag |con_id | con_name   | con_type   | con_vals                         | con_response_code | Comment                   |
| "RobSab01"     | "NoteRS01"        | "dt_1"  |"cn_1" | "Region"   | "text"     | "Domestic,International"         | 200               | valid, existing condition |


Scenario Outline: Change a condition (Error Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
And I have created a condition named <con_name> with type <con_type> and values <con_vals> for this table
When I delete the condition <con_name> with id <con_id>
And I receive an error code as <con_response_code> for condition delete


Examples:

| dec_name       | dec_note          | dec_tag |con_id | con_name   | con_type   | con_vals                         | con_response_code | 
| "RobSab01"     | "NoteRS01"        | "dt_2"  |"cn_1" | "Region"   | "text"     | "Domestic,International"         | 500               |
