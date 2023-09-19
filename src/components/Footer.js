import React from 'react';

function getYear() {
  const date = new Date();
  let year = date.getFullYear();
  return year;
}

export default function () {
  return (
    <div>
      <footer className="py-3 my-4">
        <p className="text-center text-muted">
          © {getYear()} Company, Inc
        </p>
      </footer>
    </div>
  );
}
