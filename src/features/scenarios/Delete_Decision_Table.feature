Feature: Delete a Decision Table

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

Scenario Outline: Delete a decision table Normal Flow / Error Flow

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
When I delete the Decision Table <dec_tag>
Then I receive identifier deleted as tag <dec_tag>
And I receive an error code for delete request as <dec_response_code>

Examples:

| dec_name       | dec_note          | dec_tag | dec_response_code | Comment             |
| "RobSab01"       | "NoteRS01"          | "dt_1"   | 200               | valid name and note |
| "RobSab02"       | "NoteRS02"          | "dt_2"   | 200               | valid name and note |
| ""               | "NoteRS03"          | "dt_3"   | 400               | empty name          |
| "RobSab04"       |                   | "dt_4"   | 200               | empty note          |
| "决定05"          | "Note决定05"         | "dt_5"   | 200              | simplified Chinese  |
| "قرر06"          | "Noteقرر06"         | "dt_6"   | 200               | Arabic              |
| "تصميم گرفتن"  | "Noteتصميم گرفتن07" | "dt_7"   | 200               | Farsi               |
| "décider08"      | "Notedécider08"     | "dt_8"   | 200               | French              |
| "решить09"       | "Noteрешить09"      | "dt_9"   | 200               | Russian             |
| "αποφασίζω10"    | "Noteαποφασίζω10"   | "dt_10"   | 200               | Greek               |
| "döntsd el11"    | "Notedöntsd el11"   | "dt_11"   | 200               | Hungarian           |
| "निर्णय करना12"     |   "Noteनिर्णय करना12"  | "dt_12"   | 200               | Hindi               |
| "決定する13"      | "Note決定する13"      | "dt_13"   | 200               | Japanese           |
| "<p>RobSab14</p>"| "<p>NoteRobSab14</p>" | "dt_14" | 400               | HTML injection     |