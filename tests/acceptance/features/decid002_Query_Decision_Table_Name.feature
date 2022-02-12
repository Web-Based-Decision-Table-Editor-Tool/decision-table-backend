
Query Name of a Decision Table Story

As a developer who uses the Decision_Table_Editor_Cloud_Services to build applications
I want to query the name of an existing decision table
So that I can properly reference the name when building my applications

Acceptance Tests

##
## Note:
##
## The Step definitions are expected to manage a look up table 
## which associates the string dec_tag with a decision table identifier from the
## Decision_Table_Cloud_Sevices 
##

Scenario Outline: Query a decision table Normal Flow / Error Flow

Given I am connected to the Decision_Table_Editor_Cloud_Services
And I have created decision table named <dec_name> identified as <dec_tag>
When I query the name of Decision Table <dec_tag>
Then the returned name should match <dec_name>
And I receive an error code as <dec_response_code>

Examples:

| dec_name       | dec_note          | dec_tag | dec_response_code | Comment             |
| RobSab01       | NoteRS01          | dt_01   | 201               | valid name and note |
| RobSab02       | NoteRS02          | dt_02   | 201               | valid name and note |
|                | NoteRS03          | dt_03   | 400               | empty name          |
| RobSab04       |                   | dt_04   | 201               | empty note          |
| 决定05          | Note决定05         | dt_05   | 201               | simplified Chinese  |
| قرر06          | Noteقرر06         | dt_06   | 201               | Arabic              |
| تصميم گرفتن07  | Noteتصميم گرفتن07 | dt_07   | 201               | Farsi               |
| décider08      | Notedécider08     | dt_08   | 201               | French              |
| решить09       | Noteрешить09      | dt_09   | 201               | Russian             |
| αποφασίζω10    | Noteαποφασίζω10   | dt_10   | 201               | Greek               |
| döntsd el11    | Notedöntsd el11   | dt_11   | 201               | Hungarian           |
| निर्णय करना12                           |   Noteनिर्णय करना12                     |    dt_12   | 201               | Hindi               |
| 決定する13        | Note決定する13       | dt_13   | 201               | Japanese           |
| <p>RobSab14</p>| <p>NoteRobSab14</p> | dt_14 | 400               | HTML injection     |