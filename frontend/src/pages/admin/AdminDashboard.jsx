import Chart from "react-apexcharts"
import { useGetUsersQuery } from "../../redux/Api/apiUserSlice"
import { useGetTotalOrderQuery, useGetTotalSalesByDateQuery, useGetTotalSalesQuery } from "../../redux/Api/orderApiSlice"
import AdminMenu from "./AdminMenu"
import OrderList from "./OrderList"
import { useEffect, useState } from "react"
import { IDLE_NAVIGATION } from "react-router-dom"
import Loader from "../../component/Loader"

const AdminDashboard = () => {
    const {data:sales, isLoading} = useGetTotalSalesQuery();
    const {data: customers, isLoading: loading} = useGetUsersQuery(); 
    const {data: orders, isLoading: loadingTwo} = useGetTotalOrderQuery();
    const {data:salesDetail} = useGetTotalSalesByDateQuery();
    const [state, setState] = useState({
        options: {
            chart: {
                type:"line"
            },
            tooltip: {
                theme:'dark',
            },
            colors: ["#00E396"],
            dataLabels:{
                enabled: true
            },
            stroke: {
                curve: 'smooth'
            }, 
            title:{
                text: "Sales Trend",
                align:"left"
            },
            grid:{
                borderColor: "#ccc",
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories:[],
                title:{
                    text:"Date"
                }
            },
            yaxis:{
                title:{
                    text: "Sales"
                },
                min :0, 
            },

            legend: {
                position: "top",
                horizontalAlign: 'right',
                floating: true,
                offsetY:-25,
                offsetX: -5
            },
        },

        series: [{name:"Sales", data:[]}]
    })


    useEffect(()=> {
        if(salesDetail){   
            const formatedSaleDetails = salesDetail.salesByDate.map((item) => ({
                x:item._id,
                y: item.totalSales
            }))
            setState((prevState) => ({
                ...prevState,
                options:{
                    ...prevState.option,
                    xaxis:{
                        categories: formatedSaleDetails.map((item) => item.x)
                    }
                },
                series: [
                    {name: "Sales", data:formatedSaleDetails.map((item) => item.y) }
                ]
            }))
        }
    },[salesDetail]) 

  return (
    <>
        <AdminMenu/>
        <section className="xl:ml-[4rem] ms:ml-[0rem]">
            <div className="w-[80%] flex justify-around flex-wrap">
                <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                    <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
                        $
                    </div>

                    <p className="mt-5 text-white"> Sales</p>
                    <h1 className="text-xl font-bold text-white">
                       $ {isLoading ? <Loader/> : sales.totalSales.toFixed(2)}
                    </h1>
                </div>
                <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                    <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
                        $
                    </div>

                    <p className="mt-5 text-white"> Customers</p>
                    <h1 className="text-xl font-bold text-white">
                       {isLoading ? <Loader/> : customers?.data.length}
                    </h1>
                </div>
                <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
                    <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
                        $
                    </div>

                    <p className="mt-5">All Orders</p>
                    <h1 className="text-xl font-bold text-white">
                       $ {isLoading ? <Loader/> : orders.totalOrder}
                    </h1>
                </div>

            </div>  

            <div className="ml-[10rem] mt-[4 rem]">
                <Chart options={state.options} series={state.series} type="bar" width="70%" /> 
            </div>

            <div className="mt-[4rem]">
                <OrderList/>
            </div>
        </section>
    </>
  )
}

export default AdminDashboard