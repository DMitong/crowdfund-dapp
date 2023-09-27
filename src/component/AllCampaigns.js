import React, { useState } from 'react';
import useCampaign from '../hooks/useCampaign';
import { ethers } from 'ethers';

const ITEMS_PER_PAGE = 4;

const AllCampaigns = () => {
  const campaigns = useCampaign();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCampaign = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstCampaign = indexOfLastCampaign - ITEMS_PER_PAGE;
  const currentCampaigns = campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h2 className='text-center mt-8 text-4xl font-bold'>
        All Campaigns
      </h2>
      <div className='campaign-list text-sm grid grid-cols-2 gap-4 m-8 font-medium'>
        {currentCampaigns.map((campaign, index) => (
          <div
            key={index}
            className='bg-green-950/80 p-4 rounded-xl flex mb-2 flex-col gap-2'
          >
            <div>
              <span className='bg-green/70 font-bold p-1 rounded-md mr-2'>
                TITLE:
              </span>{' '}
              {campaign.title}
            </div>
            <div>
              <span className='bg-green/70 font-bold p-1 rounded-md mr-2'>
                FUNDING GOAL:
              </span>{' '}
              {ethers.formatEther(campaign.fundingGoal)}
            </div>
            <div>
              <span className='bg-green/70 font-bold p-1 rounded-md mr-2'>
                CREATOR:
              </span>
              {campaign.owner}
            </div>
            <div>
              <span className='bg-green/70 font-bold p-1 rounded-md mr-2'>
                DURATION:
              </span>
              {ethers.formatUnits(campaign.durationTime)}
            </div>
            <div>
              <span className='bg-green/70 font-bold p-1 rounded-md mr-2'>
                STATUS:
              </span>
              {campaign.isActive ? 'Active' : 'Inactive'}
            </div>
            <div>
              <span className='bg-green/70 font-bold p-1 rounded-md mr-2'>
                BALANCE:
              </span>
              {ethers.formatEther(campaign.fundingBalance)}
            </div>
          </div>
        ))}
      </div>
      <div className='pagination text-center'>
        {Array.from({ length: Math.ceil(campaigns.length / ITEMS_PER_PAGE) }, (_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-4 py-2 mx-1 bg-green-600 text-white rounded-md ${
              currentPage === i + 1 ? 'bg-green-800' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default AllCampaigns;
