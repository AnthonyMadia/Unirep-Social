const Feed = () => {
    return (
        <div>
            Popular
            <div className="feed-row">
                <div className="toggle-switch">
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                        <img className="diamond" src="/images/diamond.png" />
                        <img className="clock" src="/images/clock.png" />
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Feed;