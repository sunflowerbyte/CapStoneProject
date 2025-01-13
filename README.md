<h1>Lab Checks</h1> 
<p><i>A laboratory management system for consumables and equipment servicing tracking and management. This provides an integrated system for managing laboratory inventory and maintenance requests efficiently as  laboratories often face the challenge of recording using spreadsheets and hardcopy systems.</i>  </p>

### Key Points:
1. **Section Titles**:
   The `##` and `###` provide clear titles and subsections for "Run Frontend and Backend" instructions.

2. **Code Block Clarity**:
   Each code snippet is properly enclosed in triple backticks for correct rendering.

3. **Optional Notes Section**:
   Adds important reminders or additional setup details for clarity.

You can copy-paste this directly into your `README.md`. Let me know if you need further adjustments! 🚀


<h2>Features</h2>
		<ul>
	<li>
			Integrated Maintenance request system
		</li>
			<li>
			Real-time	inventory updates.
		<li>
			Priority-based notifications
		</li>
			<li> Sort functionality for requests/orders</li>
			<li> User authentication and role-based access
			</li>
 </ul>

<h2>⚙️ Installation</h2>

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running


### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/sunflowerbyte/CapStoneProject.git

2. **Set up environment variables:**
   ```makefile
   DB_URI=mongodb://localhost:27017/Laboratory
   JWT_SECRET=your_jwt_secret
   PORT=8080

3. **Run frontend and backend:**

   Backend:
   
   ```bash
   cd backend
   npm install
   npm start
   ```


   Frontend:
   
    ```bash
    cd frontend
    npm install
    npm run dev
    ```


## 📖 Usage

1. Navigate to the (https://http://localhost:5173/).
2. Log in using your credentials.
3. Explore features:
   - Manage and order consumables under the "Inventory" tab.
   - Check logged maintenance requests and submit new requests under the "Maintenance" tab.
   - Check the thread of new and previous announcements under the "Notices" tab. 
4. Enjoy seamless lab management!





		
		


