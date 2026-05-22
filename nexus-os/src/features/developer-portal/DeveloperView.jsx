/** @format */

import useDeveloperProjects from "../../Hook/useDeveloperProjects";
import Spinner from "../../ui/Spinner";
import useAuth from "../../Hook/useAuth";

function DeveloperView() {
  const { user } = useAuth();
  const {
    data: developerProjects,
    isLoading: isDeveloperProjectsLoading,
    error: developerProjectsError,
  } = useDeveloperProjects(user);

  return (
    <div>
      <h1> {user.user_metadata?.full_name} </h1>

      <div>
        <h2>Your Projects</h2>
        {isDeveloperProjectsLoading && <Spinner />}
        {developerProjectsError && (
          <p>Error: {developerProjectsError.message}</p>
        )}
        <ul>
          {developerProjects?.map((project) => (
            <li key={project.id}>
              {project.title} — {project.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DeveloperView;
