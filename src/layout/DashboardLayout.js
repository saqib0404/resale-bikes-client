import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Footer from '../pages/Shared/Footer';
import Navbar from '../pages/Shared/Navbar';

const DashBoardLayout = () => {
    const { user } = useContext(AuthContext);
    const { data: dbUser = [] } = useQuery({
        queryKey: ['dbUser'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json();
            return data;
        }
    })

    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><Link to='/dashboard'>My Orders</Link></li>
                        {
                            dbUser?.userType === 'Seller' &&
                            <>
                                <li><Link to='/dashboard'>Add A Product</Link></li>
                                <li><Link to='/dashboard'>My Products</Link></li>
                            </>

                        }
                        {/* {
                        isAdmin && 
                        <>
                        <li><Link to='/dashboard/allusers'>Users</Link></li>
                        <li><Link to='/dashboard/adddoctor'>Add Doctor</Link></li>
                        <li><Link to='/dashboard/managedoctors'>Manage Doctors</Link></li>
                        </>
                        } */}
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashBoardLayout;