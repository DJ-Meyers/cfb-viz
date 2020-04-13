import React, { useContext } from 'react';
import { ResponsiveSwarmPlot } from '@nivo/swarmplot';
import { Grid } from 'semantic-ui-react';
import RecruitingLegend from './RecruitingLegend';

import RecruitsContext from '../../context/recruits/recruitsContext';

const TalentChart = () => {
  const recruitsContext = useContext(RecruitsContext);

  const {
    rosterBreakdown,
    breakdownBy,
    filteredRoster,
    filterBy
  } = recruitsContext;

  const getColor = () => {
    if (breakdownBy === 'Year') {
      switch (filterBy) {
        case 'OL':
          return '#1f77b4';
        case 'QB':
          return '#ff7f0e';
        case 'RB':
          return '#2ca02c';
        case 'WR':
          return '#d62728';
        case 'TE':
          return '#9467bd';
        case 'DL':
          return '#8c564b';
        case 'LB':
          return '#e377c2';
        case 'DB':
          return '#7f7f7f';
        case 'ST':
          return '#bcbd22';
        default:
          return '#bcbd22';
      }
    } else {
      switch (filterBy) {
        case 'FR':
          return '#1f77b4';
        case 'SO':
          return '#ff7f0e';
        case 'JR':
          return '#2ca02c';
        case 'SR':
        default:
          return '#d62728';
      }
    }
  };
  return (
    <Grid>
      <Grid.Column width={14}>
        <ResponsiveSwarmPlot
          data={filteredRoster.length === 0 ? rosterBreakdown : filteredRoster}
          groups={
            breakdownBy === 'Position'
              ? ['OL', 'QB', 'RB', 'WR', 'TE', 'DL', 'LB', 'DB', 'ST']
              : ['FR', 'SO', 'JR', 'SR']
          }
          groupBy={breakdownBy === 'Year' ? 'year' : 'position'}
          margin={{
            top: 20,
            right: 40,
            bottom: 60,
            left: 40
          }}
          height={400}
          useMesh
          colors={filterBy ? getColor() : { scheme: 'category10' }}
          colorBy={d => {
            switch (breakdownBy) {
              case 'Year':
                switch (d.data.position) {
                  case 'OL':
                    return 0;
                  case 'QB':
                    return 1;
                  case 'RB':
                    return 2;
                  case 'WR':
                    return 3;
                  case 'TE':
                    return 4;
                  case 'DL':
                    return 5;
                  case 'LB':
                    return 6;
                  case 'DB':
                    return 7;
                  case 'ST':
                    return 8;
                  default:
                    return 9;
                }
              case 'Position':
              default:
                switch (d.data.year) {
                  case 'FR':
                    return 1;
                  case 'SO':
                    return 2;
                  case 'JR':
                    return 3;
                  case 'SR':
                    return 4;
                  default:
                    return 5;
                }
            }
          }}
          identity="name"
          value="rating"
          valueScale={{ type: 'linear', min: 0.7, max: 1 }}
          size={10}
          forceStrength={4}
          simulationIterations={100}
          motionStiffness={50}
          motionDamping={10}
          axisBottom={{
            orient: 'bottom',
            tickSize: 10,
            tickPadding: 5,
            tickRotation: 0,
            legend: `Roster breakdown by ${breakdownBy}`,
            legendPosition: 'middle',
            legendOffset: 50
          }}
        />
      </Grid.Column>
      <Grid.Column width={2}>
        <RecruitingLegend />
      </Grid.Column>
    </Grid>
  );
};

export default TalentChart;
