import React from "react";
import useUser from "../../hooks/use-user";
import User from "./user";
import Suggestions from "./suggestions";

export default function Sidebar() {
  const {
    user: { docId, fullName, username, userId, following, emailAddress },
  } = useUser();

  return (
    <section className="order-1 space-y-6 md:order-2">
      <User
        username={username}
        fullName={fullName}
        emailAddress={emailAddress}
      />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </section>
  );
}
