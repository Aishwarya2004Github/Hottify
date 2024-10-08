import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state"; // Adjust this path if needed
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween"; // Adjust this path if needed

const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.mixed().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: null,
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:5000/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(setLogin({ user: loggedIn.user, token: loggedIn.token }));
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    
  
    <Formik
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
      onSubmit={handleFormSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              backgroundColor: palette.background.default,
              padding: "2rem",
              borderRadius: "10px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          
          >
            {isRegister && (
              <>
               <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  autoComplete="off"
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2",
                    "& input": { color: palette.text.primary },
                    "& fieldset": { borderColor: palette.divider },
                    "& .MuiInputLabel-root": { color: palette.text.secondary },
                   }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  autoComplete="off"
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2",
                    "& input": { color: palette.text.primary },
                    "& fieldset": { borderColor: palette.divider },
                    "& .MuiInputLabel-root": { color: palette.text.secondary },
                   }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location || ""}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" ,
                    "& input": { color: palette.text.primary },
                    "& fieldset": { borderColor: palette.divider },
                    "& .MuiInputLabel-root": { color: palette.text.secondary },
                  }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation || ""}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" ,
                    "& input": { color: palette.text.primary },
                    "& fieldset": { borderColor: palette.divider },
                    "& .MuiInputLabel-root": { color: palette.text.secondary },
                  }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.divider}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email || ""}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4",
                "& input": { color: palette.text.primary },
                "& fieldset": { borderColor: palette.divider },
                "& .MuiInputLabel-root": { color: palette.text.secondary },
               }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password || ""}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4",
                "& input": { color: palette.text.primary },
                "& fieldset": { borderColor: palette.divider },
                "& .MuiInputLabel-root": { color: palette.text.secondary },
               }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                background: "linear-gradient(90deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
                color: palette.background.alt,
                borderRadius: "30px",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(253,187,45,1)",
                  transform: "scale(1.05)",
                },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                fontWeight: "bold",
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.main,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
