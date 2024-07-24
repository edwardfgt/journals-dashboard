import { useState } from 'react'
import RevenueDashboard from './components/revenueDashboard'
import Sidebar from './components/sidebar';
import { Card, Title } from '@tremor/react';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

return (
  <div className="flex h-screen bg-tremor-background dark:bg-dark-tremor-background">
    <Sidebar />
    <div className="flex-1 overflow-auto">
      <div className="p-4 md:p-10 max-w-7xl mx-auto">
        <Card className="mb-5">
          <Title>Agency Revenue Dashboard</Title>
        </Card>
        <RevenueDashboard />
      </div>
    </div>
  </div>
);
} 

export default App;