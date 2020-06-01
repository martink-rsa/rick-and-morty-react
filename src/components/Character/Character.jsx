import React from 'react';

const Character = ({ data }) => {
  // const { name, origin, species, location, status, image } = props.data;
  console.log(data);
  const { name, origin, species, location, status, image, gender } = data;
  return (
    <div>
      <div>Name: {name}</div>
      <div>Species: {species}</div>
      <div>Status: {status}</div>
      <div>
        Origin: <a href={origin.url}>{origin.name}</a>
      </div>
      <div>
        Location: <a href={location.url}>{location.name}</a>
      </div>
      <div>
        <img src={image} alt={name} />
      </div>
    </div>
  );
};

export default Character;
