import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';

const RecipeBuilder: React.FC = () => {
  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Recipe Builder/Reader</Card.Title>
          <Card.Text>
            This feature is currently under construction.
            Tool to read, modify, add, and delete recipes in JSON format, and export new JSON files.
            Requirements: CRUD operations, working with JSON files, and possibly integrating with the flipping utilities plugin.
          </Card.Text>
          <Button variant="primary" disabled>Coming Soon</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RecipeBuilder;
