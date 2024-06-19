function ScrollToTop() {
    return (
        <>
            {/* Back to Top */}
            <button
                onClick={() => window.scrollTo(0, 0)}
                className="btn btn-lg btn-primary btn-lg-square back-to-top"
            >
                <i className="bi bi-arrow-up" />
            </button>
            {/* Back to Top */}
        </>
    );
}

export default ScrollToTop;
