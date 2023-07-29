# RES_EXPRESS

How to Install and Run an Express.js Application:

1. Install Node.js:
   - Use the following commands to install Node.js and npm (Node Package Manager):
     ```
     curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```

2. Check Node.js Version:
   - Verify that Node.js is installed by checking its version:
     ```
     node -v
     ```

3. Pull Project from GitHub:
   - Make sure you have updated your machine. If not, you can install it using:
     ```
     sudo apt-get update
     ```
   - Then, clone your Express.js project from GitHub:
     ```
     git clone https://github.com/your-username/your-express-app.git
     cd your-express-app
     ```

4. Install Project Dependencies:
   - Install the project dependencies using npm (Node Package Manager):
     ```
     npm install
     ```

5. Install PM2 (Process Manager):
   - Install PM2 globally using npm to manage your Node.js application process:
     ```
     sudo npm install -g pm2
     ```

6. Start the Express.js Application with PM2:
   - Use PM2 to start your Express.js application in the background:
     ```
     pm2 start server.js
     ```

7. View Application Logs:
   - To view the logs for your application, use the following command:
     ```
     pm2 log 0
     ```

8. Stop the Application:
   - If you want to stop the application managed by PM2, you can delete the application using:
     ```
     pm2 delete 0
     ```

Note: The step numbers provided above correspond to the order of actions to follow. Be sure to replace `your-username` and `your-express-app` with the appropriate values for your GitHub repository and Express.js application.

With these steps, you should be able to install and run your Express.js application successfully using PM2 for process management.
