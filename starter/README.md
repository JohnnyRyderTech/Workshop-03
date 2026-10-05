# Workshop 03 – Public Files

This folder contains the HTML pages, stylesheet and favicon served by the Express.js application.

## Folder Structure

public/
├── index.html
├── about.html
├── contact.html
├── 404.html
├── 500.html
├── Laurea_favicon.png
├── README.md
└── styles/
    └── style.css

## Files

| File | Purpose |
|------|---------|
| index.html | Home page |
| about.html | About page |
| contact.html | Contact page |
| 404.html | Custom page for unmatched routes |
| 500.html | Custom page for server errors |
| Laurea_favicon.png | Website favicon |
| styles/style.css | Website styling |

## Serving the Files

The server uses Express static middleware to serve files from this folder:

app.use(express.static(publicDirectory, { index: false }));

Automatic index serving is disabled so the explicit GET / route serves index.html.

The page routes use res.sendFile() with absolute paths.

## Page Routes

| Route | HTML File |
|-------|-----------|
| / | index.html |
| /about | about.html |
| /contact | contact.html |

The stylesheet is available at /styles/style.css.

## Error Pages

Unmatched routes return HTTP status 404 and display 404.html.

Server errors are logged in the terminal, return HTTP status 500 and display 500.html.

If an error page cannot be served, the corresponding handler returns a plain-text error message.

Opening /500.html directly displays the static HTML file; it does not test the 500 error handler.

## API Endpoints

The API endpoints are implemented in server.js using Express Router. They do not require files in this folder.

| Endpoint | Response |
|----------|----------|
| /api/time | Current ISO date/time and timestamp in milliseconds |
| /api/info | Server name, Node.js version and Express version |
| /api/status | Server status, uptime and memory usage |

## Running Locally

Open a terminal in the starter folder and run:

    npm install
    npm start

If PowerShell blocks npm.ps1, use:

    npm.cmd install
    npm.cmd start

Open http://localhost:3000 in your browser.

Keep the terminal running while using the website. Press Ctrl+C to stop the server.

## Testing

- Confirm the home, about and contact pages load.
- Confirm navigation links work and CSS styling is applied.
- Visit /api/time, /api/info and /api/status to check the JSON responses.
- Visit /nonexistent to test the 404 handler.
- To test the 500 handler, temporarily uncomment the demonstration /test-error route in server.js and restart the server.
- Comment out the demonstration route again after testing.

## Author

Johnny Kuoppala  
Laurea University of Applied Sciences  
Full Stack Development – Workshop 03