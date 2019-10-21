import React from "react";
import {logErrorToSlackChannel} from "./utils/crashHandlingUtils";
import {Button, Result} from "antd";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service

        logErrorToSlackChannel(error, errorInfo);
    }

    redirectToHome = () => {
        window.location.replace("/");
    }

    render() {
        let that = this;
        if (this.state.hasError) {
            return <Result
                status="500"
                title="500"
                subTitle={"Sorry, something went wrong."}
                extra={<Button type="primary" onClick={this.redirectToHome}>Back Home</Button>}
            />;
        }

        return this.props.children;
    }
}