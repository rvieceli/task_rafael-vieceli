interface Campaign {
  id: number;
  name: string;
  description: string;
  progress: number;
}

export interface Mapper {
  id: number;
  name: string;
  imageUrl: string;
  mission_count: number;
  rating: number;
}

export interface Mission {
  id: number;
  campaign_id: number;
  mappers: Array<Mapper>;
  description: string;
  completed: boolean;
}

const DESCRIPTION_LENGTH = 80;

export async function getCampaigns(page: number = 1): Promise<{
  campaigns: Array<Campaign>;
  page_count: number;
}> {
  const data = await import("./campaigns.json");
  const allCampaigns = data.default;

  const start = (page - 1) * 10;
  const end = start + 10;

  const campaigns = allCampaigns
    .slice(start, end)
    .map(({ description, ...campaign }) => {
      const short_description =
        description.length < DESCRIPTION_LENGTH
          ? description
          : description.substring(0, DESCRIPTION_LENGTH - 3) + "...";

      return {
        ...campaign,
        description: short_description,
      } satisfies Campaign;
    });

  return {
    campaigns,
    page_count: Math.ceil(allCampaigns.length / 10),
  };
}

export async function getCampaign(id: number): Promise<Campaign | undefined> {
  const data = await import("./campaigns.json");
  const allCampaigns = data.default;

  const campaign = allCampaigns.find((campaign) => campaign.id === id);

  if (!campaign) {
    return undefined;
  }

  return campaign satisfies Campaign;
}

export async function getMappers(page: number): Promise<{
  mappers: Array<Mapper>;
  page_count: number;
}> {
  const data = await import("./mappers.json");
  const allMappers = data.default;

  const start = (page - 1) * 10;
  const end = start + 10;

  return {
    mappers: allMappers.slice(start, end) satisfies Array<Mapper>,
    page_count: Math.ceil(allMappers.length / 10),
  };
}

export async function getMapper(id: number): Promise<Mapper | undefined> {
  const data = await import("./mappers.json");
  const allMappers = data.default;

  const mapper = allMappers.find((campaign) => campaign.id === id);

  if (!mapper) {
    return undefined;
  }

  return mapper satisfies Mapper;
}

export async function getMapperMissions(mapper_id: number, page: number) {
  return getMissions(1, page);
}

export async function getMissions(
  campaign_id: number,
  page: number
): Promise<{
  missions: Array<Mission>;
  page_count: number;
}> {
  const PAGE_SIZE = 5;

  const data = await import("./missions.json");
  const allMissions = data.default;
  const campaignMissions = allMissions;
  // .filter((mission) => mission.campaign_id === campaign_id);

  const mappersData = await import("./mappers.json");
  const allMappers = mappersData.default;

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const missions = campaignMissions
    .slice(start, end)
    .map(({ mapper_ids, ...mission }) => {
      const mappers: Mapper[] = allMappers.filter(({ id }) =>
        mapper_ids.includes(id)
      );

      return {
        ...mission,
        mappers: mappers,
      } satisfies Mission;
    });

  return {
    missions,
    page_count: Math.ceil(campaignMissions.length / PAGE_SIZE),
  };
}

export async function getMission(id: number): Promise<Mission | undefined> {
  const data = await import("./missions.json");
  const allMissions = data.default;

  const mappersData = await import("./mappers.json");
  const allMappers = mappersData.default;

  const mission = allMissions.find((mission) => mission.id === id);

  if (!mission) {
    return undefined;
  }

  const mappers: Mapper[] = allMappers.filter(({ id }) =>
    mission.mapper_ids.includes(id)
  );

  return { ...mission, mappers } satisfies Mission;
}
