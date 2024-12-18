import React, { useState, useRef, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LuDot } from "react-icons/lu"; // Import the LuDot icon
import { useLocation, useNavigate } from "react-router-dom";
import JwtService from "src/app/auth/services/jwtService";

const Root = styled("div")(({ theme }) => ({
  backgroundColor: "white",
}));

const CustomPaper = styled(Paper)(({ theme }) => ({
  boxShadow: "4px 4px 10px 0px #00000066",
}));

const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) =>
    !["isError", "focused", "hasValue", "isLastInputFilled"].includes(prop),
})(({ isError, focused, hasValue, isLastInputFilled }) => ({
  width: "48px",
  height: "48px",
  backgroundColor: isError ? "#FF143E1A" : "#E8EFED", // Change background color if there's an error
  borderRadius: "8px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: isError
    ? "1px solid #FF143E" // Change border color if there's an error
    : focused
    ? "1px dashed #41D87B"
    : hasValue
    ? "1px solid #41D87B"
    : "1px solid #DDE4E2",
  ...(isLastInputFilled &&
    !isError && {
      border: "1px solid #41D87B",
    }),
  "& .MuiOutlinedInput-input": {
    textAlign: "center",
    fontSize: "24px",
    padding: "0px",
    fontWeight: 500,
    color: hasValue || focused ? "#000" : "#BCC3C1",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
}));

const PlaceholderContainer = styled("div")(({ theme }) => ({
  width: "48px",
  height: "48px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  backgroundColor: "#E8EFED",
  border: "1px solid #DDE4E2",
}));

function VerifyCodePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [code, setCode] = useState(["", "", "", "", "", ""]); // Initialize with empty strings
  const [focusIndex, setFocusIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, code.length); // Trim existing refs
    for (let i = 0; i < code.length; i++) {
      inputRefs.current[i] = inputRefs.current[i] || React.createRef(); // Initialize refs
    }
    inputRefs.current[0]?.focus(); // Focus the first input on mount
  }, [code.length]);

  const handleChange = (index, event) => {
    const value = event.target.value.replace(/\D/g, ""); // Only allow digits
    const newCode = [...code];

    if (value.length > 0) {
      newCode[index] = value.slice(0, 1); // Set the current input
      setCode(newCode);

      if (index < 5) {
        setFocusIndex(index + 1); // Set focus to the next input
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 0);
      }
    } else {
      newCode[index] = ""; // Clear the input
      setCode(newCode);
    }

    if (newCode.join("").length === 6) {
      setFocusIndex(-1); // Remove focus from all inputs once all digits are filled
      setTimeout(() => {
        inputRefs.current[5]?.blur(); // Blur the last input
      }, 0);
    }

    setIsError(false); // Reset error state
  };

  const handleFocus = (index) => {
    setFocusIndex(index);
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      const newCode = [...code];

      if (index === 5 && newCode[index] === "") {
        // If the 6th input is empty, clear the previous input and move focus to it
        newCode[index - 1] = "";
        setCode(newCode);
        setFocusIndex(index - 1);
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 0);
      } else if (index === 5) {
        // If the 6th input is not empty, just clear it and stay on the same field
        newCode[index] = "";
        setCode(newCode);
        setFocusIndex(index);
        setTimeout(() => {
          inputRefs.current[index]?.focus();
        }, 0);
      } else {
        // For all other inputs (index 0 to 4)
        newCode[index] = ""; // Reset the current input on backspace
        if (index > 0) {
          newCode[index - 1] = ""; // Clear the previous input as well
        }
        setCode(newCode);

        if (index > 0) {
          setFocusIndex(index - 1); // Focus the previous input
          setTimeout(() => {
            inputRefs.current[index - 1]?.focus();
          }, 0);
        }
      }
    }
  };

  const validateCode = () => {
    console.log("iiinsidevalidate code intiated");
    const otp = code.join("");
    JwtService.verifyUserOtp(otp, email)
      .then((res) => {
        navigate("/profile");
      })
      .catch((err) => {
        console.log("error votp", err);
      });
  };

  const navToProfile = () => {
    navigate("/profile");
  };

  return (
    <Root className="flex flex-col flex-auto items-center justify-center min-w-0">
      <CustomPaper className="w-full sm:w-auto min-h-auto rounded-xl bg-transparent mx-8 sm:mx-auto">
        <div className="w-auto sm:w-[480px]">
          <div className="flex justify-center items-center h-[90px] bg-[#004F4C] rounded-t-xl">
            <img
              className="w-[150px]"
              src="assets/images/logo/logo.svg"
              alt="logo"
            />
          </div>
          <div className="p-[28px] sm:py-[32px] sm:px-[48px] bg-white rounded-b-xl items-center justify-center flex flex-col">
            <Typography component="p" className="text-[24px] font-medium">
              Enter Verification Code
            </Typography>
            <Typography
              component="p"
              className="text-[14px] font-normal mt-[12px]"
            >
              We have sent a 6-digit code to
            </Typography>
            <Typography component="p" className="text-[14px] font-bold">
              {email}
            </Typography>
            <div className="flex gap-12 my-[24px]">
              {code.map((digit, index) => (
                <React.Fragment key={index}>
                  {digit === "" && focusIndex !== index ? ( // Show the placeholder icon if no digit is present
                    <PlaceholderContainer>
                      <LuDot size={40} color="#BCC3C1" />
                    </PlaceholderContainer>
                  ) : (
                    <StyledTextField
                      value={digit}
                      inputRef={(el) => (inputRefs.current[index] = el)} // Correctly assign refs
                      onChange={(event) => handleChange(index, event)}
                      onFocus={() => handleFocus(index)}
                      onKeyDown={(event) => handleKeyDown(event, index)}
                      inputProps={{
                        maxLength: 1,
                        style: { caretColor: "#000" },
                      }}
                      isError={isError}
                      focused={focusIndex === index}
                      hasValue={digit !== ""}
                      isLastInputFilled={index === 5 && code[5] !== ""}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            {isError && (
              <Typography
                component="p"
                className="text-[16px] font-medium mb-[12px]"
                color="primary"
              >
                <span className="text-[#FF143E]">Verification Failed !</span>{" "}
                &nbsp;
                <span>try again</span>
              </Typography>
            )}
            <div className="flex items-center justify-center gap-4">
              <Typography className="text-[16px] font-normal">
                Didn’t get code?
              </Typography>
              <Typography className="text-[14px] font-medium underline">
                Click to resend
              </Typography>
            </div>
            <div className="flex w-full items-center gap-12 mt-[24px]">
              <Button
                variant="outlined"
                className=" w-full font-medium text-[16px]"
                aria-label="Cancel"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className=" w-full font-medium text-[16px]"
                aria-label="Verify"
                onClick={validateCode}
              >
                Verify
              </Button>
            </div>
          </div>
        </div>
      </CustomPaper>
    </Root>
  );
}

export default VerifyCodePage;
