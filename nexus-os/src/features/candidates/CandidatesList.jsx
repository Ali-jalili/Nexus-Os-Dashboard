/** @format */

import toast from "react-hot-toast";
import useCandidates from "../../Hook/useCandidates";
import supabase from "../../services/supabase";
import { useQueryClient } from "@tanstack/react-query";

function CandidatesList() {
  const { data } = useCandidates();
  const queryClient = useQueryClient();

  async function handleHire(item) {
    const { data: candidateData, error: candidateError } = await supabase
      .from("developers")
      .insert({
        full_name: item.full_name,
        email: item.email,
        specialty: item.specialty,
        resume_url: item.resume_url,
      });

    if (candidateError) return toast.error(candidateError.message);

    if (candidateData) {
      await supabase.from("candidates ").delete().eq("id", item.id);
    }

    queryClient.invalidateQueries({ queryKey: ["candidates"] });
  }

  return (
    <div>
      <h1>CandidatesList</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Resume URL</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item.id}>
                <td>{item.full_name}</td>
                <td>{item.email}</td>
                <td>{item.specialty}</td>
                <td>{item.resume_url}</td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleHire(item)}>Hire</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CandidatesList;
