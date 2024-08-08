# Todo API
This service is used to create a todo list with a title, description, and an initial status with a default of pending. The service supports creating, viewing all, viewing details, updating todos, and deleting todos. The database used is Oracle, but MySQL can also be used.

### Test API
1. Open postman
2. Then import the Todo.postman_collection.json file that is in the project
3. And you can directly hit each API in the collection

### Test unit tests
for all tests use this command:
```
npm test
```

OR

for each test run the following command:
```
npm test <FILENAME>_test.js
```

# Import Database
1. Buka Aplikasi DB anda, misal MySQL Workbench
2. import file <database>.sql yang ada di project, ada di menu Server -> Data Import
3. pilih yang import from Self-Contained file, pilih file <database>.sql yang ada di project
4. Start import