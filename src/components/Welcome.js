import React from 'react'

export default () => {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);

  return (
    <React.Fragment>
      { user &&
          <h3>Hi, {user.first_name}!</h3>
      }
    </React.Fragment>
  );
}

