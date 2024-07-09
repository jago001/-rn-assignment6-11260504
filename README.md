# -rn-assignment6-11260504

### README for React Native Shopping App

#### Overview

This React Native application provides a shopping interface where users can browse products, add them to a cart, and view their cart. The app consists of three main components: `App.js`, `HomeScreen.js`, and `CartScreen.js`.

#### Components

1. **App.js**
   - This is the entry point of the application. It handles navigation and state management for the cart. The state is persisted across sessions using `AsyncStorage`.
   - The `App` component uses React Navigation to switch between the `HomeScreen` and `CartScreen`.

2. **HomeScreen.js**
   - Displays a list of products from which users can add items to their cart.
   - Each product is displayed using the `ProductCard` component which includes a "+" button to add the item to the cart.
   - The cart state is managed locally and updated to `AsyncStorage` for persistence.

3. **CartScreen.js**
   - Displays items that have been added to the cart.
   - Users can view their selected items, and the screen is dynamically updated to show changes in the cart's contents.
   - An empty state is shown if the cart is empty.

#### Features

- **Product Browsing:** Users can browse a predefined list of products.
- **Cart Management:** Users can add items to their cart from the `HomeScreen` and view them on the `CartScreen`.
- **Persistent Cart:** Cart contents are saved in local storage, allowing users to retain their cart after closing the app.
- **Navigation:** Uses React Navigation's stack navigator for moving between screens.

#### Setup and Running

1. **Installation**
   - Ensure you have Node.js and npm installed.
   - Install the React Native CLI if not already installed: `npm install -g react-native-cli`
   - Clone the repository and navigate to the project directory.

2. **Dependencies**
   - Install dependencies: `npm install`
   - Ensure you have a suitable iOS or Android simulator setup to run the app.

3. **Running the App**
   - Start the Metro bundler: `npx react-native start`
   - Run the app on iOS: `npx react-native run-ios`
   - Run the app on Android: `npx react-native run-android`

#### Development Notes

- The application has been developed and tested in a controlled environment. Further testing across different devices and OS versions is recommended.
- Future enhancements could include integrating with a backend service for a real-time product catalog and user authentication.

This README provides a basic outline for setting up and understanding the app. For more detailed documentation, refer to the comments within the codebase and the official React Native documentation.