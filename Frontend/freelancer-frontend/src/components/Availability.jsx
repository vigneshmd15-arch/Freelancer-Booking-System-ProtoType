import { useState } from "react";
import api from "../services/api";

function Availability({ freelancer, onSelectSlot, onBack }) {

    const [date, setDate] = useState("");
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const today = new Date().toLocaleDateString("en-CA");

    const fetchSlots = async () => {

        console.log("Freelancer:", freelancer);
        console.log("Freelancer ID:", freelancer.id);
        console.log("Selected Date:", date);

        if (!date) {
            setError("Please select a booking date.");
            return;
        }

        if (date < today) {
            setError("Please select today or a future date.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setSlots([]);

            const response = await api.get("/bookings/available-slots", {
                params: {
                    freelancerId: freelancer.id,
                    date: date
                }
            });

            console.log("API Response:", response.data);

            setSlots(response.data);

        } catch (error) {

            console.error("Error fetching slots:", error);
            setError("Unable to fetch available slots.");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="availability-section">

            <button className="back-btn" onClick={onBack}>
                ← Back to Freelancers
            </button>

            <div className="availability-heading">

                <span className="section-label">
                    BOOK YOUR SESSION
                </span>

                <h2>Check Availability</h2>

                <p>
                    Select a date and choose your preferred time slot.
                </p>

            </div>

            <div className="selected-freelancer">

                <div className="profile-avatar">
                    {freelancer.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h3>{freelancer.name}</h3>
                    <p>{freelancer.skill}</p>
                </div>

            </div>

            <div className="date-selection">

                <label>Select Booking Date</label>

                <div className="date-input-group">

                    <input
                        type="date"
                        min={today}
                        value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            setSlots([]);
                            setError("");
                        }}
                    />

                    <button
                        className="primary-btn"
                        onClick={fetchSlots}
                        disabled={loading}
                    >
                        {loading ? "Checking..." : "Find Slots"}
                    </button>

                </div>

            </div>

            {error && (
                <p className="error-message">{error}</p>
            )}

            {slots.length > 0 && (
    <div className="slots-section">
        <h3>Available Time Slots</h3>
        <p>Select a time that works best for you.</p>

        <div className="slot-container">
            {slots.map((slot, index) => (
                <button
                    key={index}
                    className="slot-btn"
                    onClick={() => onSelectSlot(slot, date)}
                >
                    {slot.substring(0, 5)}
                </button>
            ))}
        </div>
    </div>
)}


            {!loading && date && slots.length === 0 && !error && (

                <div className="empty-state">
                    <h3>No available slots</h3>
                    <p>Try selecting another date.</p>
                </div>

            )}

        </div>
    );
}

export default Availability;