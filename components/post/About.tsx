"use client";

import { useUsers } from "@/hooks/useUsers";

const About = () => {
  const { users, isLoading, createUser } = useUsers();
  if (isLoading) return <h2>Loading ...</h2>;
  return (
    <section>
      <button
        onClick={() => createUser.mutate({ email : 'a@a.com' , name : "ali", image : "123456"})}
      >
        Add
      </button>
      <div>
        {users?.map((user) => {
          return (
            <h2 key={user._id} className="text-3xl">
              {user.name}
            </h2>
          );
        })}
      </div>
    </section>
  );
};

export default About;
