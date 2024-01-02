import React, { Fragment, useEffect } from 'react'
import Sidebar from './Sidebar.js'
import MetaData from '../../components/layout/MetaData.js'
import './dashboard.css'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Typography } from '@material-ui/core'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { getAdminProduct } from '../../actions/productAction.js'
import { getAllOrders } from '../../actions/orderAction.js'
import { getAllUsers } from '../../actions/userAction.js'

const Dashboard = () => {

    const dispatch = useDispatch();
    const {products} = useSelector((state)=> state.products); 
    const {orders} = useSelector((state)=> state.allOrders); 
    const {error, users} = useSelector((state)=> state.allUsers);

    let outOfStock =0;

    {products && products.forEach((item) => {
        if(item.stock === 0){
            outOfStock += 1;
        }
    });}

    useEffect(() => {
      dispatch(getAdminProduct());
      dispatch(getAllOrders());
      dispatch(getAllUsers());
    }, [dispatch])
    
    let TotalAmount = 0;
    orders && orders.forEach((item)=>{
        TotalAmount += item.totalPrice;
    })


    let TotalProducts = products && products.length;
    let TotalOrders = orders && orders.length;
    let TotalUsers = users && users.length;

    const data1 = [
        { name: 'Initial Amount', 'TOTAL AMOUNT': 0 },
        { name: 'Amount Earned', 'TOTAL AMOUNT': TotalAmount },
      ];

    const data2 = [
        { name: 'Out Of Stock', value: outOfStock },
        { name: 'In Stock', value: products.length - outOfStock },
      ];
    const COLORS = ['#00A6B4', '#6800B4'];

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["#eb4034"],
                hoverBackgroundColor: ["rgb(197,72,49)"],
                data: [0, TotalAmount],
            },
        ],
    };
    const doughnutState = {
        labels: ["Out Of Stock", "In Stock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4","#6800B4"],
                hoverBackgroundColor: ["#4B5000","#35014F"],
                data: [2, 10],
            },
        ],
    };

  return (
    <Fragment>
        <MetaData title={"Dashboard"}/>
        <div className='dashboard'>
            <Sidebar />

            <div className='dashboardContainer'>
                <Typography component="h1">Dashboard</Typography>
                <div className='dashboardSummary'>
                    <div>
                        <p>
                            Total Amount <br/> ${TotalAmount}
                        </p>
                    </div>
                    <div className='dashboardSummaryBox2'>
                        <Link to="/admin/products">
                            <p>Products</p>
                            <p>{TotalProducts}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{TotalOrders}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{TotalUsers}</p>
                        </Link>
                    </div>
                </div>
                <div className='lineChart'>
                <ResponsiveContainer width="100%" height={500}>
                    <LineChart data={data1} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="TOTAL AMOUNT" stroke="#eb4034" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
                </div>
                <div className='doughnutChart'>
                <ResponsiveContainer width="100%" height={500}>
                    <PieChart>
                    <Pie
                        data={data2}
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        // label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                        // const RADIAN = Math.PI / 180;
                        // const radius = 25 + innerRadius + (outerRadius - innerRadius);
                        // const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        // const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        // return (
                        //     <text x={x} y={y} fill="#8884d8" textAnchor="middle" dominantBaseline="central">
                        //     {data2[index].name}
                        //     </text>
                        // );
                        // }}
                    >
                        {data2.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                </div>
            </div>
        </div>
    </Fragment>
    
  )
}

export default Dashboard