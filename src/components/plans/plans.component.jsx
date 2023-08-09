import { useState, useEffect } from 'react';
import './plans.styles.css';
import db from '../../firebase';
import {
  collection,
  getDocs,
  doc,
  query,
  where,
  addDoc,
  getDoc,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import { loadStripe } from '@stripe/stripe-js';

const Plans = () => {
  const [products, setProducts] = useState([]);
  const [subscriptions, setSubscriptions] = useState(null);
  const loggedUser = useSelector(selectUser);

  useEffect(() => {
    console.log('useEffect ran');
    const getLoggedInUserSubscriptions = async () => {
      const customerRef = doc(db, `customers/${loggedUser.uid}`);
      const subscriptionsCollection = collection(customerRef, 'subscriptions');
      const subscriptions = await getDocs(query(subscriptionsCollection, where('status', '==', 'active')));
      if (subscriptions) {
        subscriptions?.forEach((sub) => {
          console.log('subscription', sub?.id, sub?.data());
        });
      }
      
    };

    getLoggedInUserSubscriptions();

    return getLoggedInUserSubscriptions;
  }, []);

  useEffect(() => {
    const getData = async () => {
      const productsObj = {};

      const productsRef = collection(db, 'products');
      const customQuery = query(productsRef, where('active', '==', true));
      const productsSnapshot = await getDocs(customQuery);

      productsSnapshot.forEach(async (productDoc) => {
        productsObj[productDoc.id] = productDoc.data();

        const pricesSnapshot = await getDocs(
          collection(productDoc.ref, 'prices')
        );

        pricesSnapshot.forEach(async (priceDoc) => {
          productsObj[productDoc.id].prices = {
            priceId: priceDoc.id,
            priceData: priceDoc.data(),
          };
        });
      });

      setProducts(productsObj);
    };
    getData();

    return getData;
  }, []);

  const loadCheckoutPage = async (priceId) => {
    const customerRef = doc(db, `customers/${loggedUser.uid}`);

    const customerCheckOutSessions = collection(
      customerRef,
      'checkout_sessions'
    );

    try {
      const res = await addDoc(customerCheckOutSessions, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      await getDocs(query(customerCheckOutSessions)); // Updates the context
      const sessionId = (
        await getDoc(doc(customerCheckOutSessions, res.id))
      ).data()?.sessionId;

      if (sessionId) {
        const STRIPE_PUBLIC_TEST_KEY =
          'pk_test_51NQ69WEXdgag4BmL5IAETdedO50QIoyTFnPcDaVYFMM7ZVTXZ0s9vNTea5YJIN0nASy1kPn71guUJ0vS5ZhIDHuK00ZjQq3Vrm';
        const stripe = await loadStripe(STRIPE_PUBLIC_TEST_KEY);
        stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      alert(`An error ocurred: ${error.message}`); // TODO: to add a friendly message
    }
  };

  return (
    <div className="plans">
      {Object.entries(products)
        .filter(([productId, productData]) => productData.active === true)
        .map(([productId, productData]) => {
          return (
            <div className="plans__plan" key={productId}>
              <div className="plan__info">
                <h5>{productData.name}</h5>
                <h6>{productData.description}</h6>
                <h6>{productData?.prices?.priceId}</h6>
              </div>

              <button
                onClick={() => {
                  loadCheckoutPage(productData.prices.priceId);
                }}
              >
                Subscribe
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Plans;
