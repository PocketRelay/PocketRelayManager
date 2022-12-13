import "./Loader.scss";

export default function Loader() {
    return (
        <div className="loader">
            <div className="loader__spinner"></div>
            <span className="loader__text">Loading</span>
        </div>
    )
}