const handleRegisterSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axiosInstance.post("/auth/register", {
      name,
      email,
      password,
      role, // make sure role is sent
    });

    const { token, user } = res.data;

    login(token, user);

    if (user.role === "job_seeker") navigate("/seeker/dashboard");
    else if (user.role === "employer") navigate("/employer/dashboard");
    else if (user.role === "admin") navigate("/admin/dashboard");
  } catch (err) {
    setError(err?.response?.data?.message || "Register failed");
  }
};
