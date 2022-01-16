import './App.css'
import Slider from './components/Slider/Slider'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Slider />
      </QueryClientProvider>
    </div>
  )
}

export default App
