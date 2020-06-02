import React from 'react';
import PropTypes from 'prop-types';
import './Character.css';
import { Card, CardImg, CardBody, CardTitle, Table } from 'reactstrap';
import IconELink from '../../images/external-link.svg';

const Character = ({ data }) => {
  // eslint-disable-next-line object-curly-newline
  const { name, origin, species, location, status, image, gender, url } = data;
  return (
    <div>
      <Card>
        <CardImg
          top
          src={image}
          alt={name}
          className="rounded-circle card-img"
        />
        <CardBody>
          <CardTitle>
            <a href={url}>{name}</a>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <img src={IconELink} alt={name} className="icon" />
            </a>
          </CardTitle>
          <Table borderless>
            <tbody>
              <tr>
                <th scope="row">Status:</th>
                <td>{status === 'unknown' ? 'Unknown' : status}</td>
              </tr>
              <tr>
                <th scope="row">Species:</th>
                <td>{species}</td>
              </tr>
              <tr>
                <th scope="row">Gender:</th>
                <td>{gender}</td>
              </tr>
              <tr>
                <th scope="row">Origin:</th>
                <td>
                  {origin.name === 'unknown' ? (
                    'Unknown'
                  ) : (
                    <a
                      href={origin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {origin.name}
                    </a>
                  )}
                </td>
              </tr>
              <tr>
                <th scope="row">Location:</th>
                <td>
                  {location.name === 'unknown' ? (
                    'Unknown'
                  ) : (
                    <a
                      href={location.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {location.name}
                    </a>
                  )}
                </td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

Character.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    origin: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
    species: PropTypes.string,
    location: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    }),
    status: PropTypes.string,
    image: PropTypes.string,
    gender: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Character;
