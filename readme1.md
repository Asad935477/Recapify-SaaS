# Recapify

Recapify: Instantly generate concise summaries of YouTube videos and podcasts using GPT-4. Save time by getting key points from long content in just a few seconds.

## Getting Started

### Prerequisites

- Node.js 14.0 or later
- npm, yarn, pnpm, or bun

### Development Setup

First, clone the repository and install the dependencies:

```sh
git clone https://github.com/Asad935477/Recapify-SaaS.git
cd Recapify-SaaS
npm install

# or
yarn install
```

Open http://localhost:3000 with your browser to see the result.

Project Structure
app/: Contains the main application components and pages.
components: Reusable UI components.
providers: Context providers for the application.
actions: Contains actions for handling various operations.
lib: Utility functions and configurations.
Key Routes
POST /api/add-url: Accepts a URL and user ID, processes the URL, and redirects the user to the summary page if the URL is valid.
GET /transactions: Displays the user's transaction history.
GET /coins-spend: Shows the user's coin spending history.
GET /logout: Logs the user out of the application.
POST /api/summarize: Summarizes the content of a provided URL using GPT-4.
Learn More

To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js. Check out the Next.js deployment documentation for more details.

License
This project is licensed under the MIT License. See the LICENSE file for more information.

A Note From The Developer
Thank You for Visiting!
Hello, I'm Asad Khan, and I appreciate you taking the time to explore this repository. A lot of effort and dedication went into building this project, and I hope it serves as a useful resource.

Feel free to draw inspiration from the code and ideas, but please remember that plagiarism is not the way forward. Let's respect the hard work of others and always strive to create something unique! ```
