## Installation

To get started with the Simple CRM App, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Adsattt/simplecrm-backend.git
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env.local` file in the root directory of your project and add the following line:

    ```
    PGHOST=
    PGUSER=
    PGDATABASE=
    PGPASSWORD=
    PGPORT=
    PORT=
    ```

    Fill in with the pgsql configuration you are using.

## Running the Application

To run the application on your local machine:

```bash
npm run dev
```
