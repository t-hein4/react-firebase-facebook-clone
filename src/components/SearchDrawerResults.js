import { Fragment } from "react";
import FriendCard from "./Cards/FriendCard";
import UserCard from "./Cards/UserCard";

function SearchDrawerResults({ results, toggleDrawer }) {
  return (
    <>
      {results.map((result) => (
        <Fragment key={result.id}>
          {result.friend ? (
            <FriendCard user={result} toggleDrawer={toggleDrawer} />
          ) : (
            <UserCard user={result} toggleDrawer={toggleDrawer} />
          )}
        </Fragment>
      ))}
    </>
  );
}

export default SearchDrawerResults;
