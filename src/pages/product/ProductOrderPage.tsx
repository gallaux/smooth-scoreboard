import React from 'react';
import axios from "axios";

import '../../css/global.css';

export interface PageProps {
    productId: any; // Passed via route/url
}

export interface PageState {
    isLoading: boolean; // TODO: Add overlay when loading
    orders: any[];
    product?: any;
}

class ProductOrderPage extends React.Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isLoading: true,
            orders: [],
            product: undefined
        }
    }

    //componentDidMount() {
    //    const { id } = this.props.productId;
    //    if (id) {
    //        this.getProductDetails(id);
    //        this.getProductOrderList(id);
    //    } else {
    //        this.redirectToDashboard();
    //    }
    //}

    redirectToDashboard = () => {
        // Invalid URL: Redirect to dashboard/origin
        window.location.href = window.location.origin;
    }
    
    //getProductOrderList = (productId: number) => {
    //    axios(GetProductOrderListQuery(productId))
    //        .then(response => {
    //            console.log(response)
    //            if (response.status === 200 && response.data) {
    //                this.setState({
    //                    orders: response.data as any[],
    //                    isLoading: false
    //                }, () => {
    //                    // Kind of hacky...
    //                    if (this.state.orders.length === 0) {
    //                        this.redirectToDashboard();
    //                    }
    //                });
    //            } else {
    //                this.redirectToDashboard();
    //            }
    //        }).catch((error) => {
    //            console.log(error)
    //        });
    //}

    //getProductDetails = (productId: number) => {
    //    axios(GetProduct(productId))
    //        .then(response => {
    //            if (response.status === 200 && response.data) {
    //                this.setState({
    //                    product: response.data as any
    //                }, () => {
    //                    console.log(this.state)
    //                });
    //            } else {
    //                this.redirectToDashboard();
    //            }
    //        }).catch((error) => {
    //            console.log(error)
    //        });
    //}

    render() {
        return (
            <div className="page">
                <h1>{this.state.product?.title}</h1>
                <a href={"/"}>Back to Dashboard</a>
                <h2>{this.state.orders.length} Orders</h2>
                <div>
                    {
                        //!this.state.isLoading && this.state.orders.length > 0 &&
                        //this.state.orders.map((prod) =>
                        //    <HalfPanels
                        //        leftPanelContent={
                        //            <OrderPanel
                        //                order={prod}
                        //            />
                        //        }
                        //    />
                        //)
                    }
                </div>
            </div>
        );
    }
}

export default (props: PageProps) => (
    // https://stackoverflow.com/questions/58548767/react-router-dom-useparams-inside-class-component
    // Wrapping the class component in a function so we can use the useParams hook
    // Better option would be to convert the page to a functional component
    <ProductOrderPage
        {...props}
        productId={null}
    />
);