@ChangeDecisionTableNameFeature
Feature: Query Note of a Decision Table

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to query the note associated with an existing decision table
So that I can properly display it in my applications

Acceptance Tests

Scenario Outline: Query a decision table note Normal Flow

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag> with note <dec_note>
When I query the note of Decision Table <dec_tag>
Then the returned note should match <dec_note>
And I receive an error code as <dec_response_code> for querying a note

Examples:

| dec_name       | dec_note          | dec_tag | dec_response_code | Comment             |
| "RobSab01"       | "NoteRS01"          | "dt_1"   | 200               | valid name and note |
| "RobSab02"       | "NoteRS02"          | "dt_2"   | 200               | valid name and note |
| "RobSab03"       | ""                  | "dt_3"   | 200               | empty note          |
| "决定05"         | "Note决定05"         | "dt_4"   | 200               | simplified Chinese  |
| "قرر06"          | "Noteقرر06"         | "dt_5"   | 200               | Arabic              |
| "تصميم گرفتن07" | "Noteتصميم گرفتن07"| "dt_6"   | 200               | Farsi               |
| "décider08"      | "Notedécider08"     | "dt_7"   | 200               | French              |
| "решить09"       | "Noteрешить09"      | "dt_8"   | 200               | Russian             |
| "αποφασίζω10"    | "Noteαποφασίζω10"   | "dt_9"   | 200               | Greek               |
| "döntsd el11"    | "Notedöntsd el11"   | "dt_10"   | 200               | Hungarian           |
| "निर्णय करना12"     |   "Noteनिर्णय करना12 " |    "dt_11"   | 200               | Hindi               |
| "決定する13"      | "Note決定する13"       | "dt_12"   | 200               | Japanese           |
