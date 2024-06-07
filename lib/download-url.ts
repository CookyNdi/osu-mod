export type option = 'osu' | 'chimu' | 'beatconnect' | 'sayobot' | 'nerinyan' | 'mino';

type downloadUrlProps = {
  option: string;
  beatmapsetId: number;
  isNoVideo: boolean;
};

export const downloadUrl = ({ option, beatmapsetId, isNoVideo }: downloadUrlProps) => {
  switch (option) {
    case 'osu':
      return `https://osu.ppy.sh/api/v2/beatmapsets/${beatmapsetId}/download${isNoVideo ? '?noVideo=1' : ''}`;
    case 'chimu':
      return `https://chimu.moe/v1/download/${beatmapsetId}`;
    case 'beatconnect':
      return `https://beatconnect.io/b/${beatmapsetId}/`;
    case 'sayobot':
      return `https://dl.sayobot.cn/beatmaps/download/${isNoVideo ? 'novideo' : 'full'}/${beatmapsetId}`;
    case 'nerinyan':
      return `https://api.nerinyan.moe/d/${beatmapsetId}${isNoVideo ? '?nv=1' : ''}`;
    case 'mino':
      return `https://catboy.best/d/${beatmapsetId}${isNoVideo ? 'n' : ''}`;
    default:
      return `https://api.nerinyan.moe/d/${beatmapsetId}${isNoVideo ? '?nv=1' : ''}`;
  }
};
