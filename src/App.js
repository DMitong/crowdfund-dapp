import CreateCampaign from './component/CreateCampaign';
import AllCampaigns from './component/AllCampaigns';
import Header from './component/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <main className='mt-10'>
        <CreateCampaign />
        <AllCampaigns />
      </main>
    </div>
  );
}

export default App;
