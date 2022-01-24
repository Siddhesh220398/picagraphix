import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import FooterPage from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from './screens/RegisterScreen'
// import MostDownload from './screens/Most_Download_Photos'
import MostDownloadillustrations from './screens/Most_Download_illustrations'
import MostDownloadVideo from './screens/Most_Download_Video'
import ProductDetails from './screens/Product_Details'
import SearchData from './screens/searchdata'
import SearchColors from './screens/colors'
import About from './screens/about'
import contact from './screens/contact'
import PGprofiles from './screens/pg_profile'
import NotFound from './screens/NotFound'
import AccountPage from './screens/account'
import PrivateRoute from './screens/PrivateRoute'
import PichagraphixPhoto from './screens/pichagraphix_photo'
import MostDownload from './screens/most-download'
import MostCommented from './screens/most-commented'
import MostView from './screens/most-view'
import PhotoLatest from './screens/Latest'
import PhotoPopular from './screens/popular'
import PhotoFeatured from './screens/featured'
import PichaTag from './screens/pichatag'
import CategorySingle from './screens/category-single'
import AllCategory from './screens/category'
import LikePage from './screens/like-page'
import TagSingle from './screens/tag-single'
import Members from './screens/members'
import UploadImages from './screens/uploadimages'
import Success from "./Pages/Success";
import DonateSuccess from "./Pages/DonateSuccess";
import OrderSuccess from "./Pages/OrderSuccess";
import subscription from "./screens/subscription-history";
import AllPages from "./common/allPages";

function App() {
  return (
    <Router basename={'/'}>
      {/* <Header /> */}
      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen} exact />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/Most_Download_Photos' component={MostDownload} />
          <Route exact path='/Most_Download_illustrations' component={MostDownloadillustrations} />
          {/* <Route exact path='/pichagraphix/mostdownload' component={MostDownloadVideo} /> */}
          {/* <Route exact path='/about' component={About} /> */}
          <Route exact path='/contact' component={contact} />
          <Route exact path='/image-photo/:id' component={ProductDetails} />
          <Route exact path='/colors/:id' component={SearchColors} />
          <Route exact path='/searchdata/:id' component={SearchData} />
          <Route exact path='/pichagraphix/photo' component={PichagraphixPhoto} />
          <Route exact path='/pichagraphix/most/download' component={MostDownload} />
          <Route exact path='/pichagraphix/most/commented' component={MostCommented} />
          <Route exact path='/pichagraphix/most/viewed' component={MostView} />
          <Route exact path='/pichagraphix/popular' component={PhotoPopular} />
          <Route exact path='/pichagraphix/latest' component={PhotoLatest} />
          <Route exact path='/pichagraphix/featured' component={PhotoFeatured} />
          <Route exact path='/pichagraphix/tag' component={PichaTag} />
          <Route exact path='/category/:id' component={CategorySingle} />
          <Route exact path='/category' component={AllCategory} />
          <Route exact path='/tags/:id' component={TagSingle} />
          <Route exact path='/members' component={Members} />
          <Route exact path='/upload' component={UploadImages} />
          <Route exact path='/profile/:id' component={PGprofiles} />
          <Route exact path='/Success/:id' component={Success} />
          <Route exact path='/DonateSuccess/:id' component={DonateSuccess} />
          <Route exact path='/OrderSuccess/:id' component={OrderSuccess} />
          <Route exact path='/subscription' component={subscription} />
          <Route exact path={`/:page`} component={AllPages} />

          {/* <Route exact path='/pg_profile' component={PGprofiles} /> */}
          {/* <PrivateRoute exact path="/pg_profile">
          <PGprofiles />
        </PrivateRoute> */}
          <PrivateRoute exact path="/likes">
            {/* <Navbar /> */}
            <LikePage />
          </PrivateRoute>
          <Route exact path='/account' component={AccountPage} />
          <Route path="*" component={NotFound} />
          {/* <Route component={NotFound} /> */}

        </Switch>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
