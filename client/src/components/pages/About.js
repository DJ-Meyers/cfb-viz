import React, { Fragment } from 'react';
import { List } from 'semantic-ui-react';
import Title from '../layout/Title';

const About = () => {
  return (
    <Fragment>
      <Title title={'About CFB Viz'} />
      <p>
        CFB Viz is a tool I created to visualize college football statistics and
        recruiting data as well as to showcase my web development talents. Some
        of the technologies used include:
      </p>
      <List>
        <List.Item>
          <List.Icon name="react" size="large" />
          <List.Content>React</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="node js" size="large" />
          <List.Content>Node.js + Express</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="database" size="large" />
          <List.Content>MongoDB</List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name="github" size="large" />
          <List.Content>Github</List.Content>
        </List.Item>
      </List>
    </Fragment>
  );
};

export default About;
