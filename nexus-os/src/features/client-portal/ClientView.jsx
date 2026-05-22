/** @format */
import useAuth from "../../Hook/useAuth";
import { Link } from "react-router-dom";
import useClientProjects from "../../Hook/useClientProjects";
import Spinner from "../../ui/Spinner";

function ClientView() {
  const { user } = useAuth();
  const { data: clientProjects, error, isLoading } = useClientProjects(user);
  return (
    <div>
      <h1> {user.user_metadata?.full_name} </h1>
      <Link to="/request-project">Submit New Project</Link>
      <div>Show Project</div>

      <div>
        <h2>Your Projects</h2>
        {isLoading && <Spinner />}
        {error && <p>Error: {error.message}</p>}
        {clientProjects?.length === 0 && <p>No projects yet.</p>}
        <ul>
          {clientProjects?.map((project) => (
            <li key={project.id}>
              {project.title} — {project.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ClientView;
