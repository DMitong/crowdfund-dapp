import { useState, useEffect } from 'react';
import abi from '../utils/abi.json';
import { useConnection } from '../context/connection';
import { ethers } from 'ethers';

const useCampaign = () => {
  const { provider, isActive } = useConnection();
  const [campaigns, setCampaigns] = useState([]);

  const contractAddress = '0x46f44F2D1af04D54ab5BCbEF9F4D0Df9baDc1B8C';

  useEffect(() => {
    if (!isActive || !provider) return;
    const fetchData = async () => {
      const contract = new ethers.Contract(contractAddress, abi, provider);
      try {
        const campaignIds = await contract.id();
        const allCampaigns = [];
        for (let i = 1; i <= campaignIds; i++) {
          const campaign = contract.crowd(i);
          allCampaigns.push(campaign);
        }

        const campaignInfo = await Promise.all(allCampaigns);
        setCampaigns(campaignInfo);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [provider, isActive]);

  return campaigns;
};

export default useCampaign;
