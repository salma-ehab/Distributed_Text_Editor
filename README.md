# Distributed_Text_Editor #

This is a collaborative distributed text editor that allows multiple users to update and view the contents of a document with minimum latency. Multiple documents can be created where each document has its own ID. If users want to collaborate on a document, the ID of each of these users’ documents has to be the same. The distributed text editor is also fault tolerant as the contents of the documents are saved in Mongo Database. This allows the users to still view the contents of a document after closing it for a while or following a crash. The project was deployed on Heroku, so that it can be accessed by any one providing that they have the link to it. 

## Guide ##

The following Link generates a new Document with a new ID.   
https://distributed-txt-editor2.herokuapp.com/ <br />
To allow multiple Users to use the same document, the generated new link has to be sent to all Collaborators.  
