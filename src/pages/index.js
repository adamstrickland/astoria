import React from 'react'

export default () => {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to React-Static</h1>
      { user &&
          <h3>Hi, {user.first_name}!</h3>
      }
    </div>
  );
}
