import { OSU_API_BASE_URL } from '@/lib/constant';
import { ApiResponse, OsuBeatmapSetDetails, OsuUserDetails } from '@/types/osu-respone-api';

type UserDetailsResponse = ApiResponse<OsuUserDetails>;
type BeatmapSetDetailsResponse = ApiResponse<OsuBeatmapSetDetails>;

export const getOsuUserDetails = async (userId: string): Promise<OsuUserDetails | null> => {
  const res = await fetch(`${OSU_API_BASE_URL}/api/user/details/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const response: UserDetailsResponse = await res.json();
  if (response.code !== 200 || !response.data) {
    console.log(response.message);
    console.log('getOsuUserDetails ISSUE');
    return null;
  }
  return response.data;
};

export const getOsuBeatmapDetails = async (beatmapSetId: string): Promise<OsuBeatmapSetDetails | null> => {
  const res = await fetch(`${OSU_API_BASE_URL}/api/beatmapset/${beatmapSetId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const response: BeatmapSetDetailsResponse = await res.json();
  if (response.code !== 200 || !response.data) {
    console.log(response.message);
    console.log('getOsuUserDetails ISSUE');
    return null;
  }
  return response.data;
};
