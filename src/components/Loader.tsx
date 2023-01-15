import "./Loader.scss";

/**
 * Component for displaying a loading spinner to 
 * indicate that loading is happening.
 */
export default function Loader() {
    return (
        <div className="loader">
            <div className="loader__spinner"></div>
            <span className="loader__text">Loading</span>
        </div>
    )
}