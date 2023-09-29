import { useEffect, useState } from "react";
import useCampaignCount from "./useCampaignCount";
import { useConnection } from "../context/connection";
import {
    getCrowdfundContract,
    getCrowdfundContractWithProvider,
} from "../utils";

const useAllCampaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const { provider } = useConnection();
    const campaignNo = useCampaignCount();

useEffect(() => {
  const fetchAllCampaigns = async () => {
    try {
      // Get the Crowdfunding contract instance
      const contract = await getCrowdfundContract(provider, false);

      // Generate an array of campaign keys (1, 2, 3, ..., campaignNo)
      const campaignsKeys = Array.from(
        { length: Number(campaignNo) },
        (_, i) => i + 1
      );

      // Fetch details of each campaign and contributors using Promise.all
      const campaignPromises = campaignsKeys.map(async (id) => {
        const campaignDetails = await contract.crowd(id);

        // Fetch contributors for the current campaign
        const contributors = await contract.getContributors(id);

        return {
          id: Number(id),
          title: campaignDetails.title,
          fundingGoal: campaignDetails.fundingGoal,
          owner: campaignDetails.owner,
          durationTime: Number(campaignDetails.durationTime),
          isActive: campaignDetails.isActive,
          fundingBalance: campaignDetails.fundingBalance,
          contributors: contributors,
        };
      });

      const campaignResults = await Promise.all(campaignPromises);

      // Set the fetched campaign details in state
      setCampaigns(campaignResults);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  fetchAllCampaigns();

  // Listen for event
const handleProposeCampaignEvent = async (id, title, amount, duration) => {
  try {
    const contract = getCrowdfundContractWithProvider(provider);

    const campaignDetails = await contract.crowd(id);

    const contributors = await contract.getContributors(id);

    // Created a new campaign object
    const newCampaign = {
      id: Number(id),
      title,
      fundingGoal: amount,
      durationTime: Number(duration),
      isActive: true,
      fundingBalance: 0,
      owner: account,
      contributors: contributors,
    };

    // Updating the campaigns array in state by adding the new campaign
    setCampaigns((prevCampaigns) => [...prevCampaigns, newCampaign]);
  } catch (error) {
    console.error("Error handling ProposeCampaign event:", error);
  }
};

const contract = getCrowdfundContractWithProvider(provider);
contract.on("ProposeCampaign", handleProposeCampaignEvent);


  return () => {
    contract.off("ProposeCampaign", handleProposeCampaignEvent);
  };
}, [campaignNo, provider, account]);


    return campaigns;
};

export default useAllCampaigns;
