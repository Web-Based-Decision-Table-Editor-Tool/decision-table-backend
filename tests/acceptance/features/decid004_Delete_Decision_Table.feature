Feature: Delete Decision Table Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to delete an existing decision table
So that I can remove the tables I no longer need when building my applications

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##

Scenario Outline: Delete a decision table (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> for deletion
When I delete the Decision Table by id
Then I receive id of deleted table
And I receive an error code for delete request as <dec_response_code>

Examples:

| dec_name       | dec_note          | dec_response_code   | Comment             |
| "RobSab01"       | "NoteRS01"      | 200               | valid name and note |
| "RobSab02"       | "NoteRS02"      | 200               | valid name and note |
| "RobSab04"       |                 | 200               | empty note          |
| "决定05"          | "Note决定05"     | 200              | simplified Chinese  |
| "قرر06"          | "Note"           | 200              | Arabic              |
| "تصميم گرفتن"    | "Note"           | 200               | Farsi               |
| "décider08"      | "Notedécider08"   |200               | French              |
| "решить09"       | "Noteрешить09"    | 200               | Russian             |
| "αποφασίζω10"    | "Noteαποφασίζω10" | 200               | Greek               |
| "döntsd el11"    | "Notedöntsd el11" | 200              | Hungarian           |
| "निर्णय करना12"     |   "Noteनिर्णय करना12"| 200              | Hindi               |
| "決定する13"      | "Note決定する13"    | 200              | Japanese           |

Scenario Outline: Delete a decision table (Error Flow)
Given I am connected to the Decision_Table_Editor_Cloud_Services
When I delete a decision table with invlaid tag <dec_tag>
Then I receive an error code as <dec_response_code> and error message as <dec_msg>

Examples:

| dec_name       | dec_note          | dec_tag | dec_response_code | dec_msg | Comment             |
| ""             | "NoteRS03"        | "dt_X"  | 404              | "Unable to delete file with id:dt_X"| empty name          |