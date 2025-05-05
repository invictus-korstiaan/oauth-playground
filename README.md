# Microsoft Entra ID OAuth Playground

A web-based playground for testing and demonstrating various OAuth flows with Microsoft Entra ID (formerly Azure AD). This application allows you to generate authentication URLs for different OAuth flows and test them in real-time.

## Features

- Support for multiple OAuth flows:
  - Implicit Flow
  - Authorization Code Flow
  - Device Code Flow
- Easy configuration of:
  - Client ID
  - Tenant ID
  - Redirect URI
- Real-time URL generation
- One-click testing in new tab

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Register an application in the [Azure Portal](https://portal.azure.com)
2. Configure the application with appropriate redirect URIs
3. Copy your application (client) ID and tenant ID
4. Enter these values in the playground
5. Choose an authentication flow
6. Click the generated URL to test the flow

## Deployment

This application is designed to be deployed to Azure Static Web Apps. The deployment is handled automatically through GitHub Actions when you push to the main branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
