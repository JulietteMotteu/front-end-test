# Front-end test

- Technos used:
  - React and
  - Redux toolkit
  - React router
- UI framework: Material-UI
- API: https://fakestoreapi.com/
- Showcase of the app on github pages: https://juliettemotteu.github.io/front-end-test/

## Brief description

I have chosen to use Redux toolkit, which is the latest package for writing Redux and seems much easier to use.
I also implemented a simple router on the app, to access the product details page.
I used https://fakestoreapi.com/, a simple API to get fake store data (products, carts, users...). I have chosen to use products data, this way I had enough data to do a pagination on the data table.

Redux was useful to set up a store and share the data accross all the app without using props everywhere and in the end being difficult to maintain the app. It was useful for the pagination, because I had access to the products everytime I changed the page without using the products data as a prop. I also created a reducer to get only the products corresponding the page we clicked on, to get the pagination to work depending on what we have in the store.

I used the data grid component from Materiel UI (which I had never used), I had the problem that I didn't find how to place a link around the entire row, so that we could have the details on click. I decided to place the same link around each cell of the same row, with the use of `renderCell` when I define the columns. It is not optimal, but it is working.

I also decided to use functionnal component in place of class components, because the app is really small and functionnal components are easier to create. I didn't know that we can't use the React lifecycle `componentDidMount()` on non-class components, but I found about `useEffect()` hook for functionnal component that allows to run code when the render of the component is finised.

I also had the problem that where I fetch the data from the API, products datas where `null` before the component was mounted. I decided to use a `loading` variable and set it to false when the data was fetched, and conditionnally render the component depending on this variable.

Finally, I decided to make use of the store when we go the a product detail page. When we click on a product to see the details, the product detail page is rendered and the store is still filled with the data from the API. I just implemented a condition that makes the API call to get the product details if the user reload the page, because in this case, the store will be empty.

## Run locally

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
