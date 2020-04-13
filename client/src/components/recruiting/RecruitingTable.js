import React, { useContext } from 'react';
import { Table } from 'semantic-ui-react';

import RecruitsContext from '../../context/recruits/recruitsContext';

const RecruitingTable = () => {
  const recruitsContext = useContext(RecruitsContext);
  const { rosterBreakdown, filteredRoster } = recruitsContext;

  return (
    <Table style={{ marginBottom: '20px' }} fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell singleLine>Player</Table.HeaderCell>
          <Table.HeaderCell>Position</Table.HeaderCell>
          <Table.HeaderCell>Rating</Table.HeaderCell>
          <Table.HeaderCell>Stars</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {filteredRoster.length
          ? filteredRoster.map(player => (
              <Table.Row key={player.id}>
                <Table.Cell singleLine>
                  <a
                    href={player.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {player.name}
                  </a>
                </Table.Cell>
                <Table.Cell>{player.position}</Table.Cell>
                <Table.Cell>{player.rating}</Table.Cell>
                <Table.Cell>{player.stars}</Table.Cell>
              </Table.Row>
            ))
          : rosterBreakdown.map(player => (
              <Table.Row key={player.id}>
                <Table.Cell singleLine>
                  <a
                    href={player.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {player.name}
                  </a>
                </Table.Cell>
                <Table.Cell>{player.position}</Table.Cell>
                <Table.Cell>{player.rating}</Table.Cell>
                <Table.Cell>{player.stars}</Table.Cell>
              </Table.Row>
            ))}
      </Table.Body>
    </Table>
  );
};

export default RecruitingTable;
