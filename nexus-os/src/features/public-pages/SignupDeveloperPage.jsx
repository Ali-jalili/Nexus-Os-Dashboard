/** @format */

import { useState } from "react";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAuth from "../../Hook/useAuth";

function SignupDeveloperPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const { handleLogout } = useAuth();

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
          role: "developer",
        },
      },
    });

    if (error) return toast.error(error.message);
    console.log("data.user:", data.user);
    if (data.user) {
      // ذخیره رزومه در جدول candidates
      const { error: insertError } = await supabase.from("candidates").insert({
        full_name: name,
        email: email,
        specialty: specialty,
        resume_url: resumeUrl,
      });

      if (insertError) return toast.error(insertError.message);

      toast.success("Account created and resume submitted!");
      await handleLogout();
      navigate("/");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="devName">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="devName"
          placeholder="Enter your full name"
        />
      </div>
      <div>
        <label htmlFor="devEmail">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="devEmail"
          placeholder="Enter your full email"
        />
      </div>

      <div>
        <label htmlFor="devPassword">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="devPassword"
          placeholder="Enter your Password"
        />
      </div>
      <div>
        <label htmlFor="devSpecialty">Specialty</label>
        <input
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          type="text"
          id="devSpecialty"
          placeholder="e.g. Frontend Developer"
        />
      </div>

      <div>
        <label htmlFor="devResumeUrl">ResumeUrl</label>
        <input
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          type="text"
          id="devResumeUrl"
          placeholder="Enter your full ResumeUrl"
        />
      </div>
      <button type="submit">Create Account</button>
    </form>
  );
}

export default SignupDeveloperPage;
