import { useEffect, useState } from "react";
import api from "../services/api";

function FreelancerList({ onSelectFreelancer, searchTerm }) {

    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchFreelancers();
    }, []);

    const fetchFreelancers = async () => {
        try {
            const response = await api.get("/freelancers");
            setFreelancers(response.data);
            setError("");
        } catch (error) {
            console.error("Error fetching freelancers:", error);
            setError("Unable to load freelancers. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const filteredFreelancers = freelancers.filter((freelancer) =>
        `${freelancer.name} ${freelancer.skill}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p className="loading-message">Loading freelancers...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (filteredFreelancers.length === 0) {
        return (
            <div className="empty-state">
                <h3>No freelancers found</h3>
                <p>Try another search or add freelancers to your database.</p>
            </div>
        );
    }

    return (

        <div className="freelancer-grid">

            {filteredFreelancers.map((freelancer) => (

                <div className="freelancer-card" key={freelancer.id}>

                    <div className="profile-top">

                        <div className="profile-avatar">
                            {freelancer.name?.charAt(0).toUpperCase()}
                        </div>

                        <span className="available-badge">
                            Available
                        </span>

                    </div>

                    <h3>{freelancer.name}</h3>

                    <span className="skill-badge">
                        {freelancer.skill}
                    </span>

                    <p className="freelancer-description">
                        {freelancer.description}
                    </p>

                    <div className="freelancer-price">

                        <span>Hourly Rate</span>

                        <strong>
                            ₹{freelancer.hourlyRate}
                            <small>/hr</small>
                        </strong>

                    </div>

                    <button
                        className="primary-btn"
                        onClick={() => onSelectFreelancer(freelancer)}
                    >
                        Check Availability →
                    </button>

                </div>

            ))}

        </div>
    );
}

export default FreelancerList;