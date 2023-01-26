import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartPage from "../CartPage/CartPage";
import "./LandingStyles.css";


function LandingPage({ history, search }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;



  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);

  return (
    
    <>
        
        <section className="carousel" aria-label="Gallery">
            <ol className="carousel__viewport">
                <li id="carousel__slide1"
                    tabIndex="0"
                    className="carousel__slide">
                <div className="carousel__snapper">
                    <img src="/backpack.jpg" alt="backpack" className="carousel__next"></img>  

                </div>
                </li>
                <li id="carousel__slide2"
                    tabIndex="0"
                    className="carousel__slide">
                <div className="carousel__snapper"></div>
                <img src="/laptop.jpg" alt="laptop" className="carousel__next"></img>
                </li>
                <li id="carousel__slide3"
                    tabIndex="0"
                    className="carousel__slide">
                <div className="carousel__snapper"></div>
                <img src="/pants.jpg" alt="pants" className="carousel__next"></img>

                </li>
                <li id="carousel__slide4"
                    tabIndex="0"
                    className="carousel__slide">
                <div className="carousel__snapper"></div>
                 <img src="/phone.jpg" alt="phone" className="carousel__next"></img>
                   
                </li>
                <li id="carousel__slide5"
                    tabIndex="0"
                    className="carousel__slide">
                <div className="carousel__snapper"></div>
                 <img src="/shirt.jpg" alt="shirt" className="carousel__next"></img>
                   
                </li>
                <li id="carousel__slide6"
                    tabIndex="0"
                    className="carousel__slide">
                <div className="carousel__snapper"></div>
                 <img src="/shoes.jpg" alt="shoes" className="carousel__next"></img>
                   
                </li>
                <li id="carousel__slide7"
                    tabIndex="0"
                    className="carousel__slide">
                <div className="carousel__snapper"></div>
                 <img src="/shorts.jpg" alt="shorts" className="carousel__next"></img>
                   
                </li>
                <li id="carousel__slide8"
                    tabIndex="0"
                    className="carousel__slide">
                <div className="carousel__snapper"></div>
                 <img src="/tablet.jpg" alt="tablet" className="carousel__next"></img>
                   
                </li>
            </ol>
        <div className="carousel__navigation">
            <ol className="carousel__navigation-list">
            <li className="carousel__navigation-item">
                <a href="#carousel__slide1"
                className="carousel__navigation-button">Go to slide 1</a>
            </li>
            <li className="carousel__navigation-item">
                <a href="#carousel__slide2"
                className="carousel__navigation-button">Go to slide 2</a>
            </li>
            <li className="carousel__navigation-item">
                <a href="#carousel__slide3"
                className="carousel__navigation-button">Go to slide 3</a>
            </li>
            <li className="carousel__navigation-item">
                <a href="#carousel__slide4"
                className="carousel__navigation-button">Go to slide 4</a>
            </li>
            <li className="carousel__navigation-item">
                <a href="#carousel__slide5"
                className="carousel__navigation-button">Go to slide 5</a>
            </li>
            <li className="carousel__navigation-item">
                <a href="#carousel__slide6"
                className="carousel__navigation-button">Go to slide 6</a>
            </li>
            <li className="carousel__navigation-item">
                <a href="#carousel__slide7"
                className="carousel__navigation-button">Go to slide 7</a>
            </li>
            <li className="carousel__navigation-item">
                <a href="#carousel__slide8"
                className="carousel__navigation-button">Go to slide 8</a>
            </li>
            </ol>
        </div>
</section>
  
        {/* {filterList && filterList
        .filter((filteredNote) =>
        filteredNote.name.toLowerCase().includes(search.toLowerCase())
      )
        .map((item, index) => 
        
            <ul key={item.id} className="card">
                <li key={index}>
                <p>{item.name}</p>
                <p>{item.price}</p>
                <img src={item.image} alt="product"></img>
                    <button>Add to Card</button>
                </li>
                <br></br>
            </ul>
        
        )} */}
        
      <CartPage></CartPage>
    </>
  );
}

export default LandingPage;
