import { Routes, Route } from 'react-router-dom';
import SigninFormComponent from './signin.component.tsx';
import SignupFormComponent from './signup.component.tsx';
import HomeComponent from './home.component.tsx';
import GalleryComponent from './gallery.component.tsx';
import OrderFormComponent from './orderPackage.tsx';
import BusinessDetails from './admin/businessDetails.component.tsx';
import PhotographyPackages from './admin/photographyPackages.component.tsx';
import Orders from './admin/orders.component.tsx';
import Customers from './admin/customers.component.tsx';
import { useSelector } from 'react-redux';

const RoutesComponent = () => {
    const isAdmin = useSelector((state: any) => (state.userReducer.currentUser.isAdmin));

    return (
        <Routes>
            <Route path="/" element={<SigninFormComponent />} />
            <Route path="/signin" element={<SigninFormComponent />} />
            <Route path="/signup" element={<SignupFormComponent />} />
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/gallery" element={<GalleryComponent />} />
            <Route path="/order" element={<OrderFormComponent />} />
            {isAdmin && <Route path="/admin/businessDetails" element={<BusinessDetails />} />}
            {isAdmin && <Route path="/admin/photographyPackages" element={<PhotographyPackages />} />}
            {isAdmin && <Route path="/admin/orders" element={<Orders />} />}
            {isAdmin && <Route path="/admin/customers" element={<Customers />} />}
        </Routes>
    );
};

export default RoutesComponent;
