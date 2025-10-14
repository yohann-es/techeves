import Events from './components/Events.jsx'
import Hero  from './components/Hero.jsx'
import ViewAllJobs from './components/ViewAllJobs.jsx'


const App = () => {
  return (
    <>
    <Hero title='TECHEVES' subtitle='An agrigate site for tech events in ethiopia' />
    <Events />
    {/* <EventsList_II /> */}
    <ViewAllJobs />
    
    </>

  )
}

export default App