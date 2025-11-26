import { useState } from "react";
import UserCard from "../UserCard/UserCard";
import "./form.css";

export default function Form() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileLink, setProfileLink] = useState("");
    const [age, setAge] = useState("");
    const [errors, setErrors] = useState({});
    const [showCard, setShowCard] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const updateError = (field, message) => {
        setErrors((prev) => ({ ...prev, [field]: message }));
    };

    const getFirstNameError = (value) => {
        if (!value.trim()) {
            return "First name cannot be empty";
        }
        if (/\d/.test(value)) {
            return "First name cannot contain numbers";
        }
        if (value.trim().length < 3) {
            return "First name must be at least 3 characters";
        }
        return "";
    };

    const getLastNameError = (value) => {
        if (!value.trim()) {
            return "Last name cannot be empty";
        }
        if (/\d/.test(value)) {
            return "Last name cannot contain numbers";
        }
        if (value.trim().length < 3) {
            return "Last name must be at least 3 characters";
        }
        return "";
    };

    const getMobileError = (value) => {
        if (!value.trim()) {
            return "Mobile number cannot be empty";
        }
        if (!/^\d+$/.test(value)) {
            return "Mobile number can only contain digits";
        }
        if (!/^\d{10}$/.test(value)) {
            return "Mobile number must be 10 digits";
        }
        return "";
    };

    const getEmailError = (value) => {
        if (!value.trim()) {
            return "Email cannot be empty";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return "Email is not valid";
        }
        return "";
    };

    const getBirthDateValidation = (value) => {
        if (!value) {
            return { error: "Birth date cannot be empty", computedAge: "" };
        }

        const today = new Date();
        const birth = new Date(value);
        let computedAge = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            computedAge--;
        }

        if (birth > today) {
            return { error: "Birth date cannot be in the future", computedAge: "" };
        }

        if (computedAge < 18) {
            return { error: "You must be at least 18 years old", computedAge: "" };
        }

        if (computedAge > 120) {
            return { error: "Please enter a valid birth date", computedAge: "" };
        }

        return { error: "", computedAge: computedAge.toString() };
    };

    const getPasswordError = (value) => {
        if (!value) {
            return "Password cannot be empty";
        }
        if (value.length < 8) {
            return "Password must be at least 8 characters";
        }
        if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(value)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/\d/.test(value)) {
            return "Password must contain at least one number";
        }
        if (!/[!@#$%^&*]/.test(value)) {
            return "Password must contain at least one special character";
        }
        return "";
    };

    const getConfirmPasswordError = (value, valuePassword = password) => {
        if (!value) {
            return "Please confirm your password";
        }
        if (value !== valuePassword) {
            return "Passwords do not match";
        }
        return "";
    };

    const getProfileLinkError = (value) => {
        if (!value.trim()) {
            return "Profile link cannot be empty";
        }
        if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
            return "Profile link is not valid";
        }
        return "";
    };

    const handleFirstName = (value) => {
        setFirstName(value);
        updateError("firstName", getFirstNameError(value));
    };

    const handleLastName = (value) => {
        setLastName(value);
        updateError("lastName", getLastNameError(value));
    };

    const handleMobile = (value) => {
        setMobileNumber(value);
        updateError("mobileNumber", getMobileError(value));
    };

    const handleEmail = (value) => {
        setEmail(value);
        updateError("email", getEmailError(value));
    };

    const handleBirthDate = (value) => {
        setBirthDate(value);
        const { error, computedAge } = getBirthDateValidation(value);
        updateError("birthDate", error);
        setAge(computedAge);
    };

    const handlePassword = (value) => {
        setPassword(value);
        const error = getPasswordError(value);
        updateError("password", error);
        if (!error && confirmPassword) {
            updateError("confirmPassword", getConfirmPasswordError(confirmPassword, value));
        }
    };

    const handleConfirmPassword = (value) => {
        setConfirmPassword(value);
        updateError("confirmPassword", getConfirmPasswordError(value, password));
    };

    const handleProfileLink = (value) => {
        setProfileLink(value);
        updateError("profileLink", getProfileLinkError(value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const birthValidation = getBirthDateValidation(birthDate);

        const nextErrors = {
            firstName: getFirstNameError(firstName),
            lastName: getLastNameError(lastName),
            mobileNumber: getMobileError(mobileNumber),
            birthDate: birthValidation.error,
            email: getEmailError(email),
            password: getPasswordError(password),
            confirmPassword: getConfirmPasswordError(confirmPassword, password),
            profileLink: getProfileLinkError(profileLink),
        };

        setErrors(nextErrors);
        setAge(birthValidation.computedAge);

        const hasErrors = Object.values(nextErrors).some((value) => value);
        if (hasErrors) {
            setShowCard(false);
            return;
        }

        const payload = {
            firstName,
            lastName,
            mobileNumber,
            birthDate,
            email,
            password,
            profileLink,
        };

        setSubmittedData(payload);
        setShowCard(true);
        setFirstName("");
        setLastName("");
        setMobileNumber("");
        setBirthDate("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfileLink("");
        setAge("");
        setErrors({});
    };

    return (
        <div className="parent">
            {!showCard && (
                <div className="infoForm">
                <h1 id="title">Registration Form</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => handleFirstName(e.target.value)}
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}

                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => handleLastName(e.target.value)}
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}

                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        type="tel"
                        id="mobile"
                        value={mobileNumber}
                        onChange={(e) => handleMobile(e.target.value)}
                    />
                    {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}

                    <label htmlFor="birthDate">Birth Date</label>
                    <input
                        type="date"
                        id="birthDate"
                        max={new Date().toISOString().split("T")[0]}
                        value={birthDate}
                        onChange={(e) => handleBirthDate(e.target.value)}
                    />
                    {errors.birthDate && <p className="error">{errors.birthDate}</p>}

                    <label id="ageLabel">Current Age: {age || "--"}</label> <br />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => handleEmail(e.target.value)}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <label htmlFor="password">Password</label>
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => handlePassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={`toggle-btn ${showPassword ? "active" : ""}`}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            <span aria-hidden="true">👁</span>
                        </button>
                    </div>
                    {errors.password && <p className="error">{errors.password}</p>}

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <div className="password-field">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => handleConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className={`toggle-btn ${showConfirmPassword ? "active" : ""}`}
                            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                        >
                            <span aria-hidden="true">👁</span>
                        </button>
                    </div>
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                    <label htmlFor="profileLink">Profile Link</label>
                    <input
                        type="url"
                        id="profileLink"
                        value={profileLink}
                        onChange={(e) => handleProfileLink(e.target.value)}
                    />
                    {errors.profileLink && <p className="error">{errors.profileLink}</p>}

                    <button type="submit" id="submitBtn">
                        Submit
                    </button>
                </form>
            </div>
            )}

            {showCard && submittedData && (
                <div className="userCard">
                    <UserCard
                        firstName={submittedData.firstName}
                        lastName={submittedData.lastName}
                        mobileNumber={submittedData.mobileNumber}
                        birthDate={submittedData.birthDate}
                        email={submittedData.email}
                        password={submittedData.password}
                        profileLink={submittedData.profileLink}
                        onBack={() => {
                            setShowCard(false);
                            setSubmittedData(null);
                        }}
                    />
                </div>
            )}
        </div>
    );
}