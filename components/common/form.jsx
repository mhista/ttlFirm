"use client";
import { useState, useEffect } from "react";
import { Snackbar, Alert, Button, CircularProgress } from "@mui/material";

import { styled } from "@mui/system";

const CustomButton = styled(Button)({
  backgroundColor: "#e88e2e", // Orange color
  color: "#173042", // Dark blue text color
  fontWeight: "bold",
  textTransform: "uppercase",
  borderRadius: "5px",
  width: "100%", // Full width
  padding: "12px 0",
  "&:hover": {
    backgroundColor: "transparent", // Darker orange on hover
    border:'1px solid black'
  },
});

const InputField = ({
  labelName,
  placeholder,
  type,
  name,
  value,
  onChange,
}) => {
  return (
    <div className=" w-full flex flex-col">
      {/* <label className="text-gray-400">{labelName}</label> */}
      <input
        className="w-full flex mt-2 py-5 pl-2 pr-20  text-black outline-0 outline-none  border text-start border-gray-100 bg-white "
        type={type}
        id="name"
        name={name}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        required
      />
    </div>
  );
};

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    // Check if the user has sent an email within the last hour
    const lastSentTime = localStorage.getItem("lastEmailSent");
    if (lastSentTime) {
      const timeElapsed = Date.now() - parseInt(lastSentTime, 10);
      if (timeElapsed < 3600000) {
        setCooldown(true);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!navigator.onLine) {
      setSnackbar({ open: true, message: "No internet connection. Please check your network.", type: "error" });
      return;
    }
    if (cooldown) {
      setSnackbar({ open: true, message: "You can only send an email once every 10 minutes.", severity: "warning" });
      return;
    }

    

    setIsSending(true);
    // setStatus("Sending...");

    try {
      console.log(formData);
      const response = await fetch("/api/email", {
        method: "POST",
        // headers: {
        //     "Content-Type": "application/json",
        // },
        body: JSON.stringify(formData),
      });

      const result = response.json();

      if (response.ok) {
        setSnackbar({ open: true, message: "Email sent successfully!", severity: "success" });
        localStorage.setItem("lastEmailSent", Date.now().toString());
        setCooldown(true);
        setTimeout(() => setCooldown(false), 600000);
      } else {
        setSnackbar({ open: true, message: "Failed to send email. Try again later.", severity: "error" });
      }
    } catch (error) {
      console.log("Error:", error);
      setSnackbar({ open: true, message: "An error occurred. Please try again.", severity: "error" });
    }finally{
      setIsSending(false);
    }
  };

  return (
    <div>
      <form
        className="flex w-full flex-col gap-6 px-2 sm:px-5 text-white"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full gap-4">
          <InputField
            labelName="Full Name"
            placeholder="Full name"
            type={"text"}
            name={"name"}
            value={formData.name}
            onChange={handleChange}
          />
          {/* <InputField labelName="Last Name" placeholder="last name" /> */}
        </div>
        <div className="flex flex-wrap w-full gap-4">
          <InputField
            labelName="Phone number"
            placeholder="Phone number"
            type={"tel"}
            name={"phone"}
            value={formData.phone}
            onChange={handleChange}
          />
          <InputField
            labelName="Email address"
            placeholder="Email address"
            type={"email"}
            name={"email"}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <textarea
            className="w-full flex  h-[100px] mt-2 p-3 outline-0 outline-none  border border-gray-100 bg-white text-black  resize-none"
            placeholder="Please provide a brief description of your inquiry"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <CustomButton type="submit" variant="contained" className="btn rounded-lg text-white w-full hover:text-black" disabled={isSending} disableElevation>
        {isSending ? <CircularProgress size={24} /> : "Send Email"}
        </CustomButton>
      </form>
       {/* Snackbar for Success and Failure Messages */}
       <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Form;
