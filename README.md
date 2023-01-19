# Cardano Market Capitalization Graph Representation

I developed this web application to represent the market capitalization of Cardano on a logarithmic scale throughout the life of the network. Additionally, a side bar chart is included that shows the number of days in which the capitalization falls within a specific range.

## Data Retrieval

The data used in this application is obtained through a static JSON file hosted at the path "./assets/data/json/cmcdata.json". The Angular HttpClient module is used to retrieve the data and the RxJS "map" operator to process and prepare it for use in the charts. The Angular service called "DataService" handles the data retrieval and processing, as well as updating and obtaining data for the charts.

## Technologies Used

- Angular
- Chartjs
- ng2 charts
- RxJS

# Viewing the Application

You can see a live demo of the application hosted on Github pages by visiting this link: https://hugomenz.github.io/cardano-mc-anim/

To run the application locally, you can clone the repository and execute the following commands in the root of the project:

```bash
npm install
npm start
```
