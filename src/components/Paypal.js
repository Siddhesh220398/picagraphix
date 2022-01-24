import axios from 'axios';
import React, { useRef, useEffect } from 'react';
import Urls from '../Config/Urls';

export const Paypal = (props) => {
    const paypalRef = React.useRef();
// console.log('props',props)
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: props.item.name,
                                amount: {
                                    currency_code: "USD",
                                    value: props.item.amount,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    // setPaid(true);
                    props.closeModel()
                    createSubscription()
                    console.log(order);
                },
                onError: (err) => {
                    //   setError(err),
                    console.error(err);
                },
            })
            .render(paypalRef.current);
    }, []);

    const createSubscription = async () => {
        const formData = new FormData()
        formData.append("user_id", props.user_id)
        formData.append("subscription_id", props.item.id)
        formData.append("payment_type", 'paypal')

        console.log("------", props.item, props)
        axios.post(Urls.base_url + "create-user-subscription", formData)
            .then(res => {
                console.log(res.data)
                if (res.data.success) {

                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <div ref={paypalRef}></div>
        </div>
    );
}
