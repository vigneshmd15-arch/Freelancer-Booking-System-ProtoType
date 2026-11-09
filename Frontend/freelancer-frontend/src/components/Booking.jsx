import { useState } from "react";
import api from "../services/api";

function Booking({
    freelancer,
    selectedSlot,
    selectedDate,
    onBack,
    onBookingSuccess
}) {

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleBooking = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        try {

            const bookingData = {

                freelancer: {
                    id: freelancer.id
                },

                customerName: customerName,
                customerEmail: customerEmail,
                bookingDate: selectedDate,
                startTime: selectedSlot

            };

            const response = await api.post(
                "/bookings",
                bookingData
            );

            setMessage("Your booking has been confirmed!");

            onBookingSuccess(response.data);

        } catch (error) {

            console.error("Booking error:", error);

            setError(
                error.response?.data?.message ||
                "Booking failed. Please try again."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="booking-section">

            <button className="back-btn" onClick={onBack}>
                ← Back to Availability
            </button>

            <div className="booking-heading">

                <span className="section-label">
                    ALMOST THERE
                </span>

                <h2>Complete Your Booking</h2>

                <p>Enter your details to confirm your session.</p>

            </div>

            <div className="booking-summary">

                <h3>Booking Summary</h3>

                <div className="summary-row">
                    <span>Freelancer</span>
                    <strong>{freelancer.name}</strong>
                </div>

                <div className="summary-row">
                    <span>Skill</span>
                    <strong>{freelancer.skill}</strong>
                </div>

                <div className="summary-row">
                    <span>Date</span>
                    <strong>{selectedDate}</strong>
                </div>

                <div className="summary-row">
                    <span>Time</span>
                    <strong>{selectedSlot}</strong>
                </div>

                <div className="summary-row total-row">
                    <span>Hourly Rate</span>
                    <strong>₹{freelancer.hourlyRate}</strong>
                </div>

            </div>

            <form className="booking-form" onSubmit={handleBooking}>

                <h3>Your Details</h3>

                <label>Full Name</label>

                <input
                    type="text"
                    placeholder="Enter your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                />

                <label>Email Address</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    required
                />

                {error && (
                    <p className="error-message">{error}</p>
                )}

                {message && (
                    <p className="success-message">{message}</p>
                )}

                <button
                    type="submit"
                    className="primary-btn confirm-btn"
                    disabled={loading}
                >
                    {loading ? "Confirming..." : "Confirm Booking →"}
                </button>

            </form>

        </div>
    );
}

export default Booking;