import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import { listProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import Product from "../components/Product";

function SellerScreen(props) {
  const sellerId = props.match.params.id;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProduct({ seller: sellerId }));
  }, [dispatch, sellerId]);
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img className="small" src={user.logo} alt={user.name} />
                </div>
                <div className="p-1">
                  <h1>{user.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating rating={user.rating} numReviews={user.numReviews} />
            </li>
            <li>
              <a href={`mailto: ${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProducts ? (
          <LoadingBox />
        ) : errorProducts ? (
          <MessageBox>{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SellerScreen;
