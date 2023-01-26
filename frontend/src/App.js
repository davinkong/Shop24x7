import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import SingleNote from "./screens/SingleNote/SingleNote";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CartPage from "./screens/CartPage/CartPage";
import CreateNote from "./screens/SingleNote/CreateNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import Backpack from "./screens/CartPage/Backpack";
import Laptop from "./screens/CartPage/Laptop";
import Pants from "./screens/CartPage/Pants";
import Phone from "./screens/CartPage/Phone";
import Shirt from "./screens/CartPage/Shirt";
import Shoes from "./screens/CartPage/Shoes";
import Shorts from "./screens/CartPage/Shorts";
import Tablet from "./screens/CartPage/Tablet";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import MainCart from "./screens/CartPage/MainCart";
import Checkout from "./screens/Checkout/Checkout";
import Order from "./screens/Order/Order";
import OrderDetails from "./screens/Order/OrderDetails";
import AdminOrder from "./screens/MyNotes/AdminOrder";
import MainCartEdit from "./screens/CartPage/MainCartEdit";



function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        
        {/* Homepage */}
        <Route
          path="/"
          component={({ history }) => (
            <LandingPage search={search} history={history} />
          )} exact
        />
        {/* Login, Register, and Edit Profile pages */}
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />


        {/* Admin pages*/}
      
         <Route path="/add-new-product" component={CreateNote} />
        <Route path="/prod/:id" component={SingleNote} />
        <Route path="/admin/products" component={({ history }) => (
            <MyNotes search={search} history={history} />
          )} />
        <Route path="/admin/orders" component={AdminOrder} />



        
        {/*Cart Screen*/}
        {/* <Route path="/cart" component={({ history }) => (
            <MainCart search={search} history={history} />
          )} /> */}
          <Route path="/cart" component={MainCart} />
        <Route path="/carts/:id" component={MainCartEdit} />
        {/* categories: */}
        <Route path="/categories" component={CartPage} />
        <Route path="/category/1" component={Backpack}/>
        <Route path="/category/2" component={Shorts}/>
        <Route path="/category/3" component={Shirt}/>
        <Route path="/category/4" component={Pants}/>
        <Route path="/category/5" component={Phone}/>
        <Route path="/category/6" component={Tablet}/>
        <Route path="/category/7" component={Laptop}/>
        <Route path="/category/8" component={Shoes}/>
       

       {/* products: */}
        <Route path="/products" component={ProductScreen} />
        <Route path="/product/1" component={Backpack} />
        <Route path="/product/2" component={Shorts} />
        <Route path="/product/3" component={Shirt} />
        <Route path="/product/4" component={Pants} />
        <Route path="/product/5" component={Phone} />
        <Route path="/product/6" component={Tablet} />
        <Route path="/product/7" component={Laptop} />
        <Route path="/product/8" component={Shoes} />
       

       {/* Checkout */}
       <Route path="/checkout" component={Checkout} />
       <Route path="/order" component={({ history }) => (
            <Order search={search} history={history} />
          )} />
       <Route path="/detail" component={OrderDetails} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
