# Hackingly Internship Task Assignment

### About :

In Wikipedia, there is a well-known phenomenon called the "Wikipedia Loop," where clicking the first link in the main body text of a Wikipedia article and then repeating the process for subsequent articles eventually leads to the "Philosophy" page. Your task is to create a web application or API that can determine how many requests it takes to reach the "Philosophy" page from a given Wikipedia URL while displaying the path of visited pages along the way.

### Features

- **Path Tracking:** The application/API will track and display the path of visited pages, showing the sequence of links followed to reach the "Philosophy" page.
- **Recursive Processing:** Utilizes a recursive algorithm to follow the first link on each visited page, keeping track of the sequence.
- **Input Validation:** Ensures that the provided input is a valid Wikipedia URL and handles different URL formats and variations.
- **Termination Conditions:** Implements conditions to terminate the process when the "Philosophy" page is reached, preventing infinite loops.
- **User Interface:** Provides a user-friendly interface for users to input a Wikipedia URL and view the results. Includes features like input validation feedback and clear output presentation.

### Usage

#### Web Application
- **Input Wikipedia URL:** Navigate to the web application.Enter a valid Wikipedia URL in the input field.
- **View Results:** Click the "Search" button. The application will display the path of visited pages and the total number of requests to reach the "Philosophy" page.

### API
- **Make API Request:** Use a tool like Postman to make a POST request to the API endpoint with the Wikipedia URL as a parameter.
- **Receive Response:** The API will respond with the path of visited pages and the total number of requests to reach the "Philosophy" page.

