# TeamFlow

TeamFlow is a Remote Collaboration Platform that allows a team to work together in real-time. The platform uses collaborative document editing, enabling multiple users to edit documents simultaneously and efficiently.

## Technologies
- **Django Restful APIs**: For backend services and API design.
  - Authentication and Authorization
  - Real-time document connect
- **PostgreSQL**: For the relational database.
- **React/Redux**: For the frontend interface.
- **WebSocket's, WebRTC**: For connecting the document information

In the future, AWS S3 buckets will be used for storage.

## Example Use Case
1. User A signs up and creates a new project.
2. User A invites User B to collaborate.
3. User A and User B start a session or chat.
4. Both users edit a shared document in real-time.

All changes and interactions are seamlessly handled through the designed APIs and stored securely in AWS S3 and PostgreSQL.


![image](https://github.com/kevinyejoonlee/Remote-Collaboration-Platform/assets/73869929/7b055857-d8bb-4fd1-a645-0d0f854f8569)
![image](https://github.com/kevinyejoonlee/Remote-Collaboration-Platform/assets/73869929/34766a65-d889-407b-b726-850424d221c3)
![image](https://github.com/kevinyejoonlee/Remote-Collaboration-Platform/assets/73869929/2cdbffc8-3d96-4088-8cf9-2e23fcd0ad68)
