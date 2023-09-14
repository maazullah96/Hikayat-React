import { Tab, Tabs } from 'react-bootstrap'
import StoryTableView from './StoryTableView'
import StoryCardView from './StoryCardView'
import { useDataContext } from './context/DataContext'
import { useState } from 'react'
const Stories = () => {
  const [viewType, setViewType] = useState('table')
  const { data } = useDataContext()
  const { stories } = data
  console.log(stories)
  return (
    <div>
      <Tabs
        fill
        variant='pills'
        activeKey={viewType}
        onSelect={(selectedKey) => setViewType(selectedKey)}
        id='view-switch-tabs'
        className='view-switch'
      >
        <Tab eventKey='table' title='Table View'>
          <StoryTableView stories={stories} />
        </Tab>
        <Tab eventKey='card' title='Card View'>
          <StoryCardView />
        </Tab>
      </Tabs>
    </div>
  )
}
export default Stories
