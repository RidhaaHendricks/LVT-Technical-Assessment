# admin-dashboard
Admin Dashboard for Managing Temporary Numbers

- To Run Admin Dashboard UI
- Ensure you have Node.js, git, and npm installed.
1. Using your terminal e.g. VS Code Terminal/Powershell/cmd
2. Change the directory to the folder you want to clone admin-dashboard to.
3. Once in the correct directory, clone using 'git clone https://github.com/RidhaaHendricks/LVT-Technical-Assessment.git'
4. Change the directory to the folder you cloned admin-dashboard, 
   cd into admin-dashboad from the cloned folder.
5. Run script 'npm install' to install all dependencies.
6. Once all dependencies are installed. Run npm start
   to initiate script ng serve.

- To Run Server.js for data retrieval
1. Open a second terminal e.g. VS Code Terminal/Powershell/cmd
2. From the admin-dashboard directory "cd .\src\", from src "cd .\app\",
  from app "cd .\express-server\"
3. Once you're in directory "express-server", Run script 'node server.js' to start server.


# admin-dashboard Description
The reason I chose Angular & Bootstrap is because I am very similiar
with its architecture and format, as I use it on a daily bases.

- Initial data is retrieved via the express server from the https link provided. 
- The UI table can be sorted with the dropdown menu by Status or Phone Numbers 
  in ascending or descending order.
- The toggle slider is used to activate or deactivate a phone number.
- The message notification button can be used to display the messages received by a phone number.
  The data about messages and senders are randomly generated to simulate real world message data.
- Paginition is enabled, if data items gets too large, paginition can organise the data as per 
  user preference.