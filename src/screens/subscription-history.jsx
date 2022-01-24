import React, { useEffect, useState } from 'react'
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Urls from '../Config/Urls';

const Subscription = (props) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const [history, setHistory] = useState([])

    useEffect(() => {
        getHistory()
    }, [])

    const getHistory = async () => {
        await axios.get(`${Urls.base_url}subscription-history/${userInfo.user.id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.success) {
                    setHistory(res.data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="skin-1">
            <Header />
            <section className="inner-banner-sec">
                <div className="container">
                    <h1>Subscription History</h1>
                </div>
            </section>
            <div className="recent-sec pt-5">
                <div className="container">
                    <div className="download-list">
                        <ul>
                            <li>
                                <div className="down-label" style={{ marginLeft: '2%' }} >
                                    <h4 style={{ color: 'GrayText' }}>Name</h4>
                                </div>
                                <div className="down-price" >
                                    <h4 style={{ color: 'GrayText' }}>Price</h4>
                                </div>
                                <div className="down-label">
                                    <h5 style={{ color: 'GrayText' }}>Payment Type</h5>
                                </div>
                                <div className="down-date">
                                    <h5 style={{ color: 'GrayText' }}>Expire Date</h5>
                                </div>
                                <div className="down-label">
                                    <h5 style={{ color: 'GrayText' }}>Active</h5>
                                </div>
                            </li>
                            {history &&
                                history.map((item, index) => {
                                    return (
                                        <li>
                                            <div className="down-label" style={{ marginLeft: '2%' }} >
                                                <h4 >{item.subscription.name}</h4>
                                            </div>
                                            <div className="down-price" >
                                                <h4>${item.subscription.amount}</h4>
                                            </div>
                                            <div className="down-label">
                                                <h5>{item.payment_type}</h5>
                                            </div>
                                            <div className="down-date">
                                                <h5>{item.expire}</h5>
                                            </div>
                                            <div className="down-label">
                                                <h5>{item.active === 1 ? 'Active' : 'Expire'}</h5>
                                            </div>
                                        </li>
                                    )
                                })}

                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Subscription