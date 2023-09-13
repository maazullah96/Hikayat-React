import { DataProvider } from './context/DataContext'
import DashboardLayout from './layouts/DashboardLayout'

const Dashboard = () => {
  return (
    <DataProvider>
      <DashboardLayout>
        <div>Dashboard content goes here</div>
      </DashboardLayout>
    </DataProvider>
  )
}

export default Dashboard
