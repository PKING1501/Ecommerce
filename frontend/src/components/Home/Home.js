import React, {Fragment, useEffect} from 'react'
import { CgMouse } from "react-icons/cg";
import './Home.css'
import ProductCard from './ProductCard.js'
import MetaData from '../layout/MetaData.js';
import {clearErrors, getProduct} from '../../actions/productAction.js';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../layout/Loader/Loader';
import {useAlert} from 'react-alert';

const Home = () => {

const alert = useAlert();

const dispatch = useDispatch();

const {loading, error, products} = useSelector(state=>state.products)
  

useEffect(()=>{

    if(error){
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct());
},[dispatch, error,alert]);

  return (
    <Fragment>

        {loading ? <Loader /> : 
            <Fragment>

                <MetaData title={"PKING"}/>

                <div className="banner">
                    <h1>Welcome,</h1>
                    <p>Find Our Products Below</p>

                    <a href='#productsStart'>
                        <button>
                            Scroll <CgMouse/>
                        </button>
                    </a>
                </div>

                <h2 className='homeHeading' id='productsStart'>Featured Products</h2>

                <div className='container' id='container'>
                    
                    {products && products.map(product=>(<ProductCard product={product} />))}
                    
                </div>
            </Fragment>
        }
    </Fragment>

  )
}


export default Home;