import axios from "axios";
import React, { useRef, useEffect } from "react";
import Urls from "../Config/Urls";
import Notification from "../components/notification";
export const OrderPaypal = (props) => {
  const paypalRef = React.useRef();
  let amount=0;
  if(props.item.type =='small'){
          amount=props.price;    
  }else if(props.item.type =='medium'){
          amount=props.price*2;    
  }else{
          amount=props.price*4;    
  }
  console.log("props", props);
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: props.item.type,
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          // setPaid(true);
          props.closeModel();
          createSubscription();
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
            console.log('proos',props)
          let amount=0;
          if(props.item.type =='small'){
                  amount=props.price;    
          }else if(props.item.type =='medium'){
                  amount=props.price*2;    
          }else{
                  amount=props.price*4;    
          }
    const formData = new FormData();
    formData.append("user_id", props.user_id);
    formData.append("image_id", props.item.images_id);
    formData.append("image_size", props.item.type);
    formData.append("payment_type", "paypal");
    formData.append("price",amount );

    console.log("------", props.item, props);
    axios
      .post(Urls.base_url + "create-orders", formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.data.status == "success") {
          Notification("success", res.data.data.status);
        } else {
          Notification("success", res.data.data.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div ref={paypalRef}></div>
    </div>
  );
};
