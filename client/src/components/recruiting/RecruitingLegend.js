import React, { useContext, useEffect } from 'react';
import { Segment, List, Icon } from 'semantic-ui-react';
import './Recruiting.css';

import RecruitsContext from '../../context/recruits/recruitsContext';

const RecruitingLegend = () => {
  const recruitsContext = useContext(RecruitsContext);
  const {
    breakdownBy,
    setFilter,
    filterBy,
    clearFilter,
    rosterBreakdown
  } = recruitsContext;

  const items =
    breakdownBy === 'Year'
      ? [
          { key: 'OL', value: 'OL', color: '#1f77b4' },
          { key: 'QB', value: 'QB', color: '#ff7f0e' },
          { key: 'RB', value: 'RB', color: '#2ca02c' },
          { key: 'WR', value: 'WR', color: '#d62728' },
          { key: 'TE', value: 'TE', color: '#9467bd' },
          { key: 'DL', value: 'DL', color: '#8c564b' },
          { key: 'LB', value: 'LB', color: '#e377c2' },
          { key: 'DB', value: 'DB', color: '#7f7f7f' },
          { key: 'ST', value: 'ST', color: '#bcbd22' }
        ]
      : [
          { key: 'FR', value: 'FR', color: '#1f77b4' },
          { key: 'SO', value: 'SO', color: '#ff7f0e' },
          { key: 'JR', value: 'JR', color: '#2ca02c' },
          { key: 'SR', value: 'SR', color: '#d62728' }
        ];

  useEffect(() => {
    items.forEach(item => {
      let num = 0;
      rosterBreakdown.forEach(player => {
        if (breakdownBy === 'Position') {
          if (player.year === item.key) num++;
        } else {
          if (player.position === item.key) num++;
        }
      });
      item.value = item.key + ' (' + num + ')';
      console.log(item.value);
    });
    //eslint-disable-next-line
  }, [breakdownBy]);

  const onClick = (e, { name }) => {
    if (filterBy === name) clearFilter();
    else setFilter(name);
  };

  return (
    <Segment>
      {console.log(items)}
      <h4>Filter by {breakdownBy === 'Position' ? 'Year' : 'Position'}</h4>

      <List selection verticalAlign="middle">
        {items.map(item => (
          <List.Item
            key={item.key}
            name={item.value}
            style={{ color: item.color }}
            onClick={onClick}
            active={filterBy === item.key}
          >
            <Icon name="circle" />
            <List.Content>{item.value}</List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
};

export default RecruitingLegend;
