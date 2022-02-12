import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { OrderHistoryPage } from "../../pages/orderHistory/orderHistoryPage";
import { HomePage } from "../../pages/home/homePage";
import { LoginPage } from "../../pages/login/loginPage";
import { OrderPage } from "../../pages/order/orderPage";
import { RecipesPage } from "../../pages/recipes/recipesPage";
import { SavedRecipes } from "../../pages/saved/savedRecipes";
import { SearchPage } from "../../pages/search/searchPage";
import { AuthenticationGuard } from "../authenticationGuard";
// import { Cart } from "../../pages/cart/cart";
import './appLayout.scss'

export function AppLayout({ children }) {
  const navigate = useNavigate();
  return <div className="app-layout">
    <div className="app-layout-navigation">
      <Link to="/" >{sessionStorage.sessionUserFullName}</Link>
      <Link to="/search" >Search</Link>
      <Link to="/order" >Order</Link>
      <Link to="/recipes" >Recipes</Link>
      <Link to="/orderHistory" >Order history</Link>
      <Link to="/savedRecipes" >Saved</Link>
      {!sessionStorage.sessionUserFullName && <Link to="/login" >Login</Link>}

      {sessionStorage.sessionUserFullName && <a href="/login" onClick={(e) => {
        e.preventDefault();
        sessionStorage.sessionUserFullName = '';
        sessionStorage.sessionUserId = 0;
        navigate('/')
      }} >Logout</a>}

    </div>
    <div className="app-layout-content">
      <Routes>
        <Route path='/'
          element={<AuthenticationGuard>
            <HomePage />
          </AuthenticationGuard>} />

        <Route path='/login'
          element={<LoginPage />} />


        <Route path='/search'
          element={<AuthenticationGuard>
            <SearchPage />
          </AuthenticationGuard>} />


        <Route path='/order'
          element={<AuthenticationGuard>
            <OrderPage />
          </AuthenticationGuard>} />

        <Route path='/recipes'
          element={<AuthenticationGuard>
            <RecipesPage />
          </AuthenticationGuard>} />

        <Route path='/orderHistory'
          element={<AuthenticationGuard>
            <OrderHistoryPage />
          </AuthenticationGuard>} />

        <Route path='/savedRecipes'
          element={<AuthenticationGuard>
            <SavedRecipes />
          </AuthenticationGuard>} />

        {/* <Route path='/cart'
          element={<AuthenticationGuard>
            <Cart />
          </AuthenticationGuard>} /> */}

      </Routes >
    </div >
  </div >
}