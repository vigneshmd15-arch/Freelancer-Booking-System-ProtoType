import { useEffect, useState } from "react";
import api from "../services/api";
import "./FreelancerDashboard.css";

function FreelancerDashboard({ freelancerId, onBack }) {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processingId, setProcessingId] = useState(null);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/bookings/freelancer/${freelancerId}`
            );

            setBookings(response.data);
        } catch (err) {
            setError("Unable to load bookings. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [freelancerId]);

    const handleAction = async (bookingId, action) => {
        try {
            setProcessingId(bookingId);

            await api.put(`/bookings/${bookingId}/${action}`);

            await fetchBookings();
        } catch (err) {
            alert(
                err.response?.data?.message ||
                `Unable to ${action} booking.`
            );
        } finally {
            setProcessingId(null);
        }
    };

    const pendingBookings = bookings.filter(
        booking => booking.status === "PENDING"
    );

    const confirmedBookings = bookings.filter(
        booking => booking.status === "CONFIRMED"
    );

    const rejectedBookings = bookings.filter(
        booking => booking.status === "REJECTED"
    );

    if (loading) {
        return <div className="dashboard-loading">Loading bookings...</div>;
    }

    return (
        <div className="freelancer-dashboard">

            <div className="dashboard-header">

                <div>
                    <span className="dashboard-label">
                        FREELANCER PORTAL
                    </span>

                    <h1>Welcome to Your Dashboard</h1>

                    <p>Manage your customer booking requests.</p>
                </div>

                <button className="back-home-btn" onClick={onBack}>
                     Back to Home
                </button>

            </div>

            {error && (
                <div className="dashboard-error">
                    {error}
                    <button onClick={fetchBookings}>Retry</button>
                </div>
            )}

            {/* STATISTICS */}

            <div className="dashboard-stats">

                <div className="stat-card">
                    <span>Total Bookings</span>
                    <h2>{bookings.length}</h2>
                </div>

                <div className="stat-card pending-stat">
                    <span>Pending Requests</span>
                    <h2>{pendingBookings.length}</h2>
                </div>

                <div className="stat-card confirmed-stat">
                    <span>Confirmed</span>
                    <h2>{confirmedBookings.length}</h2>
                </div>

                <div className="stat-card rejected-stat">
                    <span>Rejected</span>
                    <h2>{rejectedBookings.length}</h2>
                </div>

            </div>

            {/* PENDING REQUESTS */}

            <section className="dashboard-section">

                <div className="dashboard-section-heading">
                    <div>
                        <h2>Booking Requests</h2>
                        <p>Review and respond to new customer requests.</p>
                    </div>

                    <span className="request-count">
                        {pendingBookings.length} Pending
                    </span>
                </div>

                {pendingBookings.length === 0 ? (

                    <div className="empty-bookings">
                        <div className="empty-icon">📭</div>
                        <h3>No Pending Requests</h3>
                        <p>New customer booking requests will appear here.</p>
                    </div>

                ) : (

                    <div className="booking-grid">

                        {pendingBookings.map(booking => (

                            <div className="booking-card" key={booking.id}>

                                <div className="booking-card-top">
                                    <span className="booking-id">
                                        Booking #{booking.id}
                                    </span>

                                    <span className="status-badge pending">
                                        {booking.status}
                                    </span>
                                </div>

                                <h3>{booking.customerName}</h3>

                                <p className="customer-email">
                                    {booking.customerEmail}
                                </p>

                                <div className="booking-details">

                                    <div>
                                        <span>📅 Date</span>
                                        <strong>{booking.bookingDate}</strong>
                                    </div>

                                    <div>
                                        <span>🕒 Time</span>
                                        <strong>
                                            {booking.startTime} - {booking.endTime}
                                        </strong>
                                    </div>

                                </div>

                                <div className="booking-actions">

                                    <button
                                        className="accept-btn"
                                        disabled={processingId === booking.id}
                                        onClick={() =>
                                            handleAction(booking.id, "accept")
                                        }
                                    >
                                        {processingId === booking.id
                                            ? "Processing..."
                                            : "✓ Accept"}
                                    </button>

                                    <button
                                        className="reject-btn"
                                        disabled={processingId === booking.id}
                                        onClick={() =>
                                            handleAction(booking.id, "reject")
                                        }
                                    >
                                        ✕ Reject
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

            {/* CONFIRMED BOOKINGS */}

            <section className="dashboard-section">

                <div className="dashboard-section-heading">
                    <div>
                        <h2>Confirmed Bookings</h2>
                        <p>Your accepted customer appointments.</p>
                    </div>
                </div>

                {confirmedBookings.length === 0 ? (

                    <div className="empty-bookings">
                        <h3>No Confirmed Bookings Yet</h3>
                        <p>Accepted appointments will appear here.</p>
                    </div>

                ) : (

                    <div className="booking-grid">

                        {confirmedBookings.map(booking => (

                            <div className="booking-card" key={booking.id}>

                                <div className="booking-card-top">
                                    <span className="booking-id">
                                        Booking #{booking.id}
                                    </span>

                                    <span className="status-badge confirmed">
                                        CONFIRMED
                                    </span>
                                </div>

                                <h3>{booking.customerName}</h3>

                                <p className="customer-email">
                                    {booking.customerEmail}
                                </p>

                                <div className="booking-details">

                                    <div>
                                        <span>📅 Date</span>
                                        <strong>{booking.bookingDate}</strong>
                                    </div>

                                    <div>
                                        <span>🕒 Time</span>
                                        <strong>
                                            {booking.startTime} - {booking.endTime}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    );
}

export default FreelancerDashboard;