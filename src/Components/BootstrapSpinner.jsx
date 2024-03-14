import Spinner from "react-bootstrap/Spinner";

function BootstrapSpinner() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100px",
            }}
        >
            <Spinner
                animation="border"
                role="status"
                style={{
                    margin: "0 auto",
                }}
            >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default BootstrapSpinner;
