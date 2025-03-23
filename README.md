# UniChat Setup Guide

UniChat is a real-time chat application built using SpacetimeDB, a serverless database optimized for real-time applications like games and chat platforms. This guide provides step-by-step instructions to set up both the server module and the client application.

## Prerequisites

Before proceeding, ensure you have the following installed:

- **SpacetimeDB CLI**: Install the SpacetimeDB command-line interface by running:

  ```bash
  curl -sSf https://install.spacetimedb.com | sh
  ```

  This command works for macOS and Linux. For Windows, execute the following in PowerShell:

  ```powershell
  iwr https://windows.spacetimedb.com -useb | iex
  ```


- **.NET SDK**: Required for building the C# server module.

- **Node.js and npm**: Necessary for setting up the React client.

## Project Structure

The UniChat project is organized as follows:

```
UniChat/
├── LICENSE
├── README.md
├── spacetime-modules
│   ├── Lib.cs
│   ├── StdbModule.csproj
│   ├── bin/
│   ├── global.json
│   └── obj/
└── unichat-client
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── node_modules/
    ├── package-lock.json
    ├── package.json
    ├── public/
    ├── src/
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
```

## Setting Up the Server Module

1. **Initialize the Module**: Navigate to your desired directory and initialize a new SpacetimeDB module in C#:

   ```bash
   spacetime init spacetime-modules --lang csharp
   ```


   This command creates the necessary files for your server module.

2. **Build the Module**: Compile the module to ensure there are no errors:

   ```bash
   spacetime build
   ```


3. **Publish the Module**: After building, publish your module to SpacetimeDB:

   ```bash
   spacetime publish --project-path spacetime-modules unichat
   ```


   Replace `unichat` with your desired database name.

## Setting Up the Client Application

1. **Create a React Application**: Use Vite to set up a new React TypeScript project:

   ```bash
   npm create vite@latest unichat-client -- --template react-ts
   ```


   Navigate into the project directory:

   ```bash
   cd unichat-client
   ```


2. **Install Dependencies**: Install the necessary packages:

   ```bash
   npm install
   ```


3. **Start the Development Server**: Launch the React development server:

   ```bash
   npm run dev
   ```


   Your application should now be running at `http://localhost:5173`.

4. **Install SpacetimeDB SDK**: To interact with SpacetimeDB, install the TypeScript SDK:

   ```bash
   npm install @clockworklabs/spacetimedb-sdk
   ```


5. **Generate TypeScript Bindings**: Generate TypeScript bindings based on your server module:

   ```bash
   spacetime generate --lang typescript --out-dir src/module_bindings --project-path ../spacetime-modules
   ```


   This command creates TypeScript interfaces in the `src/module_bindings` directory, allowing seamless interaction between the client and server.

## Additional Resources

For more detailed information, refer to the official SpacetimeDB documentation:

- [Getting Started with SpacetimeDB](https://spacetimedb.com/docs/getting-started)
- [SpacetimeDB Installation Guide](https://spacetimedb.com/install)
- [TypeScript Client SDK Quickstart](https://spacetimedb.com/docs/sdks/typescript/quickstart)

---

**Author**: (sugan0tech)[https://github.com/sugan0tech] 
