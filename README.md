    {/* Homepage */}
      LandingPage.js


    {/* Login, Register, and Edit Profile pages */}
        LoginScreen.js
        RegisterScreen.js
        ProfileScreen.js


    {/* Admin create Products*/}
      CreateNote.js

    {/* Admin edit and delete Products*/}
      SingleNote.js

    {/* Admin Products Homepage*/}
        MyNotes.js

    {/* Admin manage product*/}
      AdminOrder.js



        
    {/*Cart Screen*/}
      MainCart.js
    
    {/*Edit Cart*/}
      MainCartEdit.js
      
    {/* categories: */}
        CartPage.js
        <Route path="/category/1" component={Backpack}/>
        <Route path="/category/2" component={Shorts}/>
        <Route path="/category/3" component={Shirt}/>
        <Route path="/category/4" component={Pants}/>
        <Route path="/category/5" component={Phone}/>
        <Route path="/category/6" component={Tablet}/>
        <Route path="/category/7" component={Laptop}/>
        <Route path="/category/8" component={Shoes}/>
       

       {/* products: */}
        ProductScreen.js
        <Route path="/product/1" component={Backpack} />
        <Route path="/product/2" component={Shorts} />
        <Route path="/product/3" component={Shirt} />
        <Route path="/product/4" component={Pants} />
        <Route path="/product/5" component={Phone} />
        <Route path="/product/6" component={Tablet} />
        <Route path="/product/7" component={Laptop} />
        <Route path="/product/8" component={Shoes} />
       

       {/* Checkout */}
       Checkout.js

      {/* Order and details*/}
       Order.js
      OrderDetails.js