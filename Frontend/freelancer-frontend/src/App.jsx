import { useState } from "react";

import FreelancerList from "./components/FreelancerList";
import Availability from "./components/Availability";
import FreelancerDashboard from "./components/FreelancerDashboard";
import Booking from "./components/Booking";

import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState("customer");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const handleSelectFreelancer = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setSelectedSlot(null);
    setSelectedDate("");
    setBookingConfirmed(false);

    window.scrollTo(0, 0);
  };

  const handleSelectSlot = (slot, date) => {
    setSelectedSlot(slot);
    setSelectedDate(date);

    window.scrollTo(0, 0);
  };

  const handleBookingSuccess = (booking) => {
    setBookingDetails(booking);
    setBookingConfirmed(true);

    window.scrollTo(0, 0);
  };

  const resetApplication = () => {
    setSelectedFreelancer(null);
    setSelectedSlot(null);
    setSelectedDate("");
    setBookingConfirmed(false);
    setBookingDetails(null);

    window.scrollTo(0, 0);
  };

  return (
    <div className="app-container">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="logo">
          FreelanceHub
        </div>

        <div className="nav-links">

          {currentView === "customer" && (
            <>
              <a href="#home">Home</a>
              <a href="#freelancers">Find Freelancers</a>
            </>
          )}

          <button
            onClick={() => {
              setCurrentView(
                currentView === "customer" ? "freelancer" : "customer"
              );

              window.scrollTo(0, 0);
            }}
          >
            {currentView === "customer"
              ? "Freelancer Dashboard"
              : "Customer Home"}
          </button>

        </div>

      </nav>


      {/* FREELANCER DASHBOARD */}

      {currentView === "freelancer" ? (

        <FreelancerDashboard
          freelancerId={1}
          onBack={() => setCurrentView("customer")}
        />

      ) : (

        <>

          {/* HERO SECTION */}

          {!selectedFreelancer && (

            <section className="hero-section" id="home">

              <div className="hero-content">

                <span className="hero-badge">
                  YOUR TALENT. YOUR NEXT OPPORTUNITY.
                </span>

                <h1>
                  Find the Perfect Talent
                  <br />
                  <span>For Your Next Project.</span>
                </h1>

                <p>
                  Discover skilled professionals, explore their expertise
                  and book your next session in just a few clicks.
                </p>

                <div className="hero-search">

                  <span className="search-icon">⌕</span>

                  <input
                    type="text"
                    placeholder="Search by freelancer name or skill..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <button
                    onClick={() =>
                      document.getElementById("freelancers")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Explore →
                  </button>

                </div>

                <div className="hero-stats">

                  <div>
                    <strong>Easy</strong>
                    <span>Booking Process</span>
                  </div>

                  <div>
                    <strong>Flexible</strong>
                    <span>Time Slots</span>
                  </div>

                  <div>
                    <strong>Direct</strong>
                    <span>Freelancer Access</span>
                  </div>

                </div>

              </div>

            </section>

          )}


          {/* FREELANCER SECTION */}

          {!selectedFreelancer && (

            <section className="content-section" id="freelancers">

              <div className="section-heading">

                <div>
                  <span className="section-label">
                    DISCOVER EXPERTS
                  </span>

                  <h2>Meet Our Freelancers</h2>

                  <p>
                    Find the right professional for your needs.
                  </p>
                </div>

              </div>

              <FreelancerList
                onSelectFreelancer={handleSelectFreelancer}
                searchTerm={searchTerm}
              />

            </section>

          )}


          {/* AVAILABILITY SECTION */}

          {selectedFreelancer && !selectedSlot && !bookingConfirmed && (

            <main className="workflow-container">

              <Availability
                freelancer={selectedFreelancer}
                onSelectSlot={handleSelectSlot}
                onBack={resetApplication}
              />

            </main>

          )}


          {/* BOOKING SECTION */}

          {selectedFreelancer && selectedSlot && !bookingConfirmed && (

            <main className="workflow-container">

              <Booking
                freelancer={selectedFreelancer}
                selectedSlot={selectedSlot}
                selectedDate={selectedDate}
                onBack={() => setSelectedSlot(null)}
                onBookingSuccess={handleBookingSuccess}
              />

            </main>

          )}


          {/* BOOKING SUCCESS */}

          {bookingConfirmed && (

            <section className="success-container">

              <div className="success-icon">
                ✓
              </div>

              <span className="section-label">
                BOOKING SUCCESSFUL
              </span>

              <h2>Your Session Is Confirmed!</h2>

              <p>
                Thank you for booking with FreelanceHub.
                Your booking request has been successfully submitted.
              </p>

              <div className="booking-summary">

                <div className="summary-row">
                  <span>Freelancer</span>
                  <strong>{selectedFreelancer.name}</strong>
                </div>

                <div className="summary-row">
                  <span>Date</span>
                  <strong>{selectedDate}</strong>
                </div>

                <div className="summary-row">
                  <span>Time</span>
                  <strong>{selectedSlot}</strong>
                </div>

                {bookingDetails?.id && (

                  <div className="summary-row">
                    <span>Booking ID</span>
                    <strong>#{bookingDetails.id}</strong>
                  </div>

                )}

              </div>

              <button
                className="primary-btn"
                onClick={resetApplication}
              >
                Explore More Freelancers →
              </button>

            </section>

          )}


          {/* HOW IT WORKS */}

          {!selectedFreelancer && (

            <section className="how-section" id="how-it-works">

              <span className="section-label">
                SIMPLE PROCESS
              </span>

              <h2>How FreelanceHub Works</h2>

              <div className="steps-grid">

                <div className="step-card">

                  <div className="step-number">01</div>

                  <h3>Find Your Expert</h3>

                  <p>
                    Browse talented freelancers and select
                    the professional you need.
                  </p>

                </div>

                <div className="step-card">

                  <div className="step-number">02</div>

                  <h3>Choose Your Slot</h3>

                  <p>
                    Check availability and select a date
                    and time that suits you.
                  </p>

                </div>

                <div className="step-card">

                  <div className="step-number">03</div>

                  <h3>Confirm Booking</h3>

                  <p>
                    Enter your details and confirm
                    your booking easily.
                  </p>

                </div>

              </div>

            </section>

          )}

        </>

      )}


      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-logo">
          Freelance<span>Hub.</span>
        </div>

        <p>
          Connecting talent with opportunity.
        </p>

        <small>
          © 2026 FreelanceHub. All rights reserved.
        </small>

      </footer>

    </div>
  );
}

export default App;