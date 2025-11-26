import "./user-card.css";

export default function UserCard({
    firstName,
    lastName,
    mobileNumber,
    birthDate,
    email,
    password,
    profileLink,
    onBack,
}) {
    return (
        <div className="user-card">
            <img src={profileLink} alt="Profile" className="profile-pic" />
            <h2>
                {firstName} {lastName}
            </h2>
            <p>
                <strong>Mobile Number:</strong> {mobileNumber}
            </p>
            <p>
                <strong>Birth Date:</strong> {birthDate}
            </p>
            <p>
                <strong>Email:</strong> {email}
            </p>
            <p>
                <strong>Password:</strong> {password}
            </p>
            <button type="button" className="back-btn" onClick={onBack}>
                Back to form
            </button>
        </div>
    );
}