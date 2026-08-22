import Chart from "react-apexcharts"
import { useGetUsersQuery } from "../../redux/Api/apiUserSlice"
import { useGetTotalOrderQuery, useGetTotalSalesByDateQuery, useGetTotalSalesQuery } from "../../redux/Api/orderApiSlice"
import AdminMenu from "./AdminMenu"
import OrderList from "./OrderList"
import { createElement, useEffect, useState } from "react"
import Loader from "../../component/Loader"
import { BarChart3, ShoppingBag, TrendingUp, Users } from "lucide-react"

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

    console.log(orders)


    useEffect(()=> {
        if(salesDetail){   
            const formatedSaleDetails = salesDetail.salesByDate.map((item) => ({
                x:item._id,
                y: item.totalSales
            }))
            setState((prevState) => ({
                ...prevState,
                options:{
                    ...prevState.options,
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

    const metrics = [
        {
            label: "Total sales",
            value: isLoading ? null : `$${(sales?.totalSales ?? 0).toFixed(2)}`,
            detail: "Across all completed orders",
            icon: TrendingUp,
            tone: "bg-emerald-50 text-emerald-700",
        },
        {
            label: "Customers",
            value: loading ? null : (customers?.data?.length ?? 0),
            detail: "Registered store accounts",
            icon: Users,
            tone: "bg-sky-50 text-sky-700",
        },
        {
            label: "All orders",
            value: loadingTwo ? null : (orders?.totalOrder ?? 0),
            detail: "Orders placed in the store",
            icon: ShoppingBag,
            tone: "bg-amber-50 text-amber-700",
        },
    ]

    return (
        <section className="space-y-8">
            <AdminMenu />
            <div className="flex flex-col gap-2 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-600">Store overview</p>
                    <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">Good morning, admin.</h1>
                    <p className="mt-2 text-sm text-slate-500">Here is what is happening across your store today.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Live data
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {metrics.map(({ label, value, detail, icon: Icon, tone }) => (
                    <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">{label}</p>
                                <div className="mt-3 min-h-10 text-3xl font-semibold tracking-tight text-slate-950">
                                    {value === null ? <Loader /> : value}
                                </div>
                            </div>
                            <div className={`grid h-11 w-11 place-items-center rounded-xl ${tone}`}>
                                {createElement(Icon, { size: 20 })}
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-slate-400">{detail}</p>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-pink-50 text-pink-600">
                        <BarChart3 size={19} />
                    </div>
                    <div>
                        <h2 className="font-semibold text-slate-900">Sales trend</h2>
                        <p className="text-sm text-slate-500">Daily sales performance</p>
                    </div>
                </div>
                <Chart options={state.options} series={state.series} type="bar" width="100%" height={320} />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
                <div className="mb-5">
                    <h2 className="font-semibold text-slate-900">Recent orders</h2>
                    <p className="mt-1 text-sm text-slate-500">Review payments and delivery progress.</p>
                </div>
                <OrderList showMenu={false} />
            </div>
        </section>
    )
}

export default AdminDashboard