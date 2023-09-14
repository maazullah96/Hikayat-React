import { Table } from 'react-bootstrap'
const StoryTableView = ({ stories }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {stories.map((property, index) => (
          <tr key={index}>
            <td>{property.name}</td>
            <td>{property.value}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default StoryTableView
