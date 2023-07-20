# Step to reproduce

1. Create a Firebase project in the Firebase console [Create a Firebase project and register your app](https://firebase.google.com/docs/web/setup#create-firebase-project-and-app).
2. Follow this step to create database [Create database](https://firebase.google.com/docs/database/web/start#create_a_database).
3. Add `version` field into firebase realtime database.
4. Copy the contents of the `firebaseConfig` variable from the Firebase console into the `firebaseConfig` variable in `electron/firebase.ts`.
5. Run `npm run dev` to start the app.
6. Assert that 'console.log' is not called during the test execution, indicating the statements were not executed.(code between lines 36 and 46 in `electron/main.ts`)