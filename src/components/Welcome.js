import React, { useState, useEffect } from 'react'

export default () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <React.Fragment>
      { user &&
          <h3>Hi, {user.first_name}!</h3>
      }
    </React.Fragment>
  );
}
