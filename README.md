# Photography Website Project
## Description
A website that allows users to register and manage bookings for photography sessions in an efficient and convenient way. Through the website, users can choose a date and time for the meeting, and choose the type of photography package that suits them. In addition, users will enjoy a variety of service options and packages customized to their needs.
The site manager (the photographer) can enter the system and manage the orders in an efficient and organized manner. He can view the orders made by the users, edit the meetings and adapt them to the customer's needs. In addition, the manager will be able to manage all the data and actions on the site, including the users, the photography packages, the orders and more.
## Features
- User-friendly interface for clients to view and book photography packages
- Appointment scheduling functionality
- User management and permission control
- Implementation of JWT for secure authorization
- Redux for efficient state management
- REST API architecture for seamless communication
- TypeScript codebase with robust authentication mechanisms
- Unit testing for code reliability
## Installation
1. Clone the repository: `git clone https://github.com/tsiporaShub/Photographer.git`
2. Install dependencies for the client and server sides:
   - Client: `cd client && npm install`
   - Server: `cd server && npm install`
3. Set up environment variables for configuration:
   - Client:
      - VITE_DOMAIN : `<your VITE_DOMAIN>`
   - Server: 
     - DATABASEURL : `<your MongoDB_Connection>`
     - SECRET_KEY : `your SECRET_KEY`
     - PORT : `<your PORT>`
6. Run the client and server:
   - Client: `npm run dev`
   - Server: `npx ts-node app`
## Usage
1. Access the client side via `http://localhost:5173`
2. Explore the available features in the client interface
3. Log in as a regular user or photographer to access specific functionalities
4. Navigate through the admin interface for business details, services, and appointments
## Contribution
- Fork the repository
- Create a new branch
- Make your contributions
- Submit a pull request
## License
This project is licensed under the MIT License - see the LICENSE file for details.
## Contact
For any questions or feedback, please contact Tsipora Shub at t8506671@gmail.com.
