import React, { Fragment, useEffect } from 'react'
import './ProductList.css'
import {DataGrid} from '@material-ui/data-grid'
import { useDispatch, useSelector} from 'react-redux'
import {
    clearErrors,
    getAdminProduct,
    deleteProduct,
} from '../../actions/productAction'
import {Button} from '@material-ui/core'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Sidebar from "./Sidebar"
import { useNavigate } from 'react-router-dom'
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const {error, products} = useSelector((state)=> state.products);
    const {error:deleteError, isDeleted, } = useSelector((state)=>state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    useEffect(() => {
        if (error) {
          alert.error(error);
          dispatch(clearErrors());
        }

        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Product Deleted Successfully");
            navigate("/admin/dashboard");
            dispatch({type: DELETE_PRODUCT_RESET});
        }
    
        dispatch(getAdminProduct());
      }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

    const columns = [
        {
            field: "id", 
            headerName: "Product ID", 
            minWidth: 250, 
            flex: 0.3
        },
        {
            field: "name", 
            headerName: "Name", 
            minWidth: 150, 
            flex: 0.2
        },
        {
            field: "stock", 
            headerName: "Stock", 
            minWidth: 150, 
            flex: 0.2
        },
        {
            field: "price", 
            headerName: "Price", 
            minWidth: 150, 
            flex: 0.2
        },
        {
            field: "actions", 
            headerName: "Actions", 
            minWidth: 100, 
            flex: 0.1, 
            type: "number", 
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon style={{ marginRight: '5px', alignContent: 'center' }} />
                        </Link>

                        <Button onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }
        },

    ]

    const rows = []

    {products && products.forEach((item) => {
        rows.push({
            id: item._id,
            stock: item.stock,
            price: item.price,
            name: item.name,
        })
    });}


  return (
    <Fragment>
        <MetaData title={"All Products -- Admin"}/>
        <div className='dashboard'>
            <Sidebar/>
            <div className='productListContainer'>
                <h1 id='productListHeading'>ALL PRODUCTS</h1>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='productListTable'
                    autoHeight
                />
            </div>
        </div>
    </Fragment>
  )
}

export default ProductList