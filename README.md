
# Photo Gallery

## Description
A photo gallery web application built using the MERN stack. Users can upload, tag, delete, and search for photos in their personal gallery.

## Features
- User authentication (Login/Logout)
- Upload photos with tags
- View photos in a gallery
- Search for photos by tags and date
- Add/remove tags from photos
- Delete photos

## Setup Instructions

### Database Setup Using phpMyAdmin

1. **Open phpMyAdmin:**
    Open your web browser and go to `http://localhost/phpmyadmin/`.

2. **Create a New Database:**
    - Click on the "New" button in the left-hand sidebar to create a new database.
    - Name the database `photo_gallery`.
    - Choose the collation `utf8_general_ci`.
    - Click "Create".

3. **Import the `db.sql` File:**
    - Select the `photo_gallery` database from the left-hand sidebar.
    - Click on the "Import" tab in the top menu.
    - Click the "Choose File" button and select the `db.sql` file located in your project directory under `server/db.sql`.
    - Ensure that the "Format" is set to SQL.
    - Click "Go" to import the database schema and data.

4. **Verify the Import:**
    - After the import is complete, you should see a success message.
    - Verify that the tables `users` and `photos` have been created and populated with the appropriate structure.

### Running the Application

1. **Start the backend server:**
    - Open a terminal.
    - Navigate to the server directory:
      ```bash
      cd client
      cd server
      ```
    - Start the server:
      ```bash
      node index.js or npm start
      ```

2. **Start the frontend server:**
    - Open another terminal.
    - Navigate to the client directory:
      ```bash
      cd client
      ```
    - Start the frontend server:
      ```bash
      npm start
      ```

3. **Open the application in your browser:**
    Go to `http://localhost:3000`.

## Users

Three users have been created for testing:

1. **User 1:**
   - Username: user1
   - Password: 123456

2. **User 2:**
   - Username: user2
   - Password: user2

3. **User 3:**
   - Username: user3
   - Password: user3

## Usage
- Log in to your account.
- Upload photos with tags.
- View your photos in the gallery.
- Search for photos by tags and date.
- Add or remove tags from your photos.
- Delete photos from your gallery.

## Video
https://github.com/ylokhande2003/PhotoGallery_Tool/assets/91784682/5d90e696-2cc3-4d70-ae13-1c3454560c9e

