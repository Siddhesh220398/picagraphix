import React, { useEffect, useState } from 'react'
import { PaymentElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from '../Config/const';
import axios from 'axios';
import Urls from '../Config/Urls';
import Header from '../components/Header';
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const MyComponent = (props) => {
    const stripe = useStripe();
    const [order_id, setorder_id] = useState(props.match.params.id)
    const [response, setresponse] = useState({})
    const [statue, setStatus] = useState('')


    useEffect(async () => {
        if (!stripe) {
            return;
        }

        var url = new URL(window.location);
        var clientSecret = await url.searchParams.get('payment_intent_client_secret');
        setStatus(url.searchParams.get('redirect_status'))


        console.log("----", clientSecret, order_id,)

        if (!clientSecret) {
            return;
        }

        await stripe.retrievePaymentIntent(clientSecret).then(function (response) {
            console.log(response)
            setresponse(response.paymentIntent)
            if (response.error) {
                // Handle error
            } else if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
                // Handle successful payment
                successOrderStatus()
            }
        });
    }, [stripe]);

    const successOrderStatus = async () => {
        const formData = new FormData()
        formData.append("order_id", order_id)
        await axios.post(Urls.base_url + "stripe-status", formData)
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="skin-1">
            <Header />
            <section class="inner-banner-sec mb-5">
                <div class="container">
                    <h1>{statue}</h1>
                </div>
            </section>

        </div>
    )
    // rest of the component
};

const Success = (props) => {



    return (
        <Elements stripe={stripePromise}>
            <MyComponent {...props} />
        </Elements>
    )


}
export default Success