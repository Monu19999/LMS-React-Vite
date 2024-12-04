import { Button } from "react-bootstrap";

function ScrollToTop() {
    return (
        <>
            {/* Back to Top */}
            <Button
                onClick={() => window.scrollTo(0, 0)}
                className="btn btn-lg btn-primary btn-lg-square back-to-top"
            >
                <i className="bi bi-arrow-up" />
            </Button>
            {/* Back to Top */}
        </>
    );
}

export default ScrollToTop;
