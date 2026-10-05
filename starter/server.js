const express = require('express');
const path = require('path');

// Create the Express application.
const app = express();
const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, 'public');

// Log every incoming request.
app.use((req, res, next) => {
    console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`
    );
    next();
});

// Serve static files before the route handlers.
// Disabling automatic index serving lets the "/" route handle the home page.
app.use(express.static(publicDirectory, { index: false }));

// Main page routes.
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(publicDirectory, 'contact.html'));
});

// organize API endpoints with Express Router.
const apiRouter = express.Router();

apiRouter.get('/time', (req, res) => {
    const now = new Date();

    res.json({
        datetime: now.toISOString(),
        timestamp: now.getTime()
    });
});

// Return server information.
apiRouter.get('/info', (req, res) => {
    res.json({
        name: 'Workshop03 Express Server',
        nodeVersion: process.version,
        expressVersion: require('express/package.json').version
    });
});

// Return server status.
apiRouter.get('/status', (req, res) => {
    res.json({
        status: 'running',
        uptimeSeconds: process.uptime(),
        memoryUsageBytes: process.memoryUsage()
    });
});

app.use('/api', apiRouter);

// Demonstration route: deliberately triggers the 500 error handler.
// app.get('/test-error', (req, res, next) => {
//    next(new Error('Testing the 500 error handler'));
//});


// Handle unmatched routes after all other routes.
app.use((req, res, next) => {
    res.status(404).sendFile(
        path.join(publicDirectory, '404.html'),
        (err) => {
            if (!err) return;

            if (res.headersSent) {
                return next(err);
            }

            res.status(404)
                .type('text')
                .send('404 - Page Not Found');
        }
    );
});

// Error middleware must have four parameters and be placed last.
app.use((err, req, res, next) => {
    console.error('Server Error:', err.stack || err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).sendFile(
        path.join(publicDirectory, '500.html'),
        (fileError) => {
            if (!fileError) return;

            if (res.headersSent) {
                return next(fileError);
            }

            res.status(500)
                .type('text')
                .send('500 - Internal Server Error');
        }
    );
});

// Start the server.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available routes:');
    console.log('  GET /           -> Home page');
    console.log('  GET /about      -> About page');
    console.log('  GET /contact    -> Contact page');
    console.log('  GET /api/time   -> Current date/time API');
    console.log('  GET /api/info   -> Server information');
    console.log('  GET /api/status -> Server status');
    console.log('Press Ctrl+C to stop the server.');
});