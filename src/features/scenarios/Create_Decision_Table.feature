
Feature: Create a Decision Table Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to create a new empty decision table
So that I have an identified placeholder to store the new decision table when building my applications

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##

Scenario Outline: Create a decision table (Normal Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
When I create decision table named <dec_name> with note <dec_note>
Then I receive identifier stored as tag <dec_tag>
And I receive an error code as <dec_response_code>

Examples:

| dec_name       | dec_note          | dec_tag | dec_response_code | Comment             |
| "RobSab01"       | "NoteRS01"          | "dt_1"   | 201               | valid name and note |
| "RobSab02"       | "NoteRS02"          | "dt_2"   | 201               | valid name and note |
| "RobSab03"       | ""                  | "dt_3"   | 201               | empty note          |
| "决定05"         | "Note决定05"         | "dt_4"   | 201               | simplified Chinese  |
| "قرر06"          | "Noteقرر06"         | "dt_5"   | 201               | Arabic              |
| "تصميم گرفتن07" | "Noteتصميم گرفتن07"| "dt_6"   | 201               | Farsi               |
| "décider08"      | "Notedécider08"     | "dt_7"   | 201               | French              |
| "решить09"       | "Noteрешить09"      | "dt_8"   | 201               | Russian             |
| "αποφασίζω10"    | "Noteαποφασίζω10"   | "dt_9"   | 201               | Greek               |
| "döntsd el11"    | "Notedöntsd el11"   | "dt_10"   | 201               | Hungarian           |
| "निर्णय करना12"     |   "Noteनिर्णय करना12 " |    "dt_11"   | 201               | Hindi               |
| "決定する13"      | "Note決定する13"       | "dt_12"   | 201               | Japanese           |

Scenario Outline: Create a decision table (Error Flow)

Given I am connected to the Decision_Table_Editor_Cloud_Services
When I create decision table with invlaid name <dec_name> with note <dec_note>
Then I receive an error code as <dec_response_code>

Examples:

| dec_name       | dec_note          | dec_tag | dec_response_code | Comment             |
| ""               | "NoteRS03"          | "dt_X"   | 400               | empty name          |
| "<p>RobSab14</p>"| "<p>NoteRobSab14</p>" | "dt_13" | 400                | HTML injection     |

