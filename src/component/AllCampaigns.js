import React from 'react';
import useCampaign from '../hooks/useCampaign';
import { ethers } from 'ethers';

const AllCampaigns = () => {
  const campaigns = useCampaign();

  return (
    <>
      <h2 className='text-center mt-8 text-4xl font-bold'>
        All Campaigns
      </h2>
      <div className='campaign-list text-sm grid grid-cols-2 gap-4 m-8 font-medium'>
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className='bg-blue-400/80 p-4 rounded-xl flex mb-2 flex-col gap-2'
          >
            <div>
              <span className='bg-white/70 p-1 rounded-md mr-2'>
                Title:
              </span>{' '}
              {campaign.title}
            </div>
            <div>
              <span className='bg-white/70 p-1 rounded-md mr-2'>
                Funding Goal:
              </span>{' '}
              {ethers.formatEther(campaign.fundingGoal)}
            </div>
            <div>
              <span className='bg-white/70 p-1 rounded-md mr-2'>
                Creator:
              </span>
              {campaign.owner}
            </div>
            <div>
              <span className='bg-white/70 p-1 rounded-md mr-2'>
                Duration:
              </span>
              {ethers.formatUnits(campaign.durationTime)}
            </div>
            <div>
              <span className='bg-white/70 p-1 rounded-md mr-2'>
                Status:
              </span>
              {campaign.isActive ? 'Active' : 'Inactive'}
            </div>
            <div>
              <span className='bg-white/70 p-1 rounded-md mr-2'>
                Balance:
              </span>
              {ethers.formatEther(campaign.fundingBalance)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllCampaigns;
