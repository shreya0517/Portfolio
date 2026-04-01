import datoCMSClient from './datoCMSClient';
import { MusicItem } from '../types';
import { DATO_SCHEMA, RawMusicItem } from './schemaMap';
import { normalizeUrl } from '../utils/normalizeUrl';

const GET_MUSIC_ITEMS = `
  query GetAllMusicItems {
    ${DATO_SCHEMA.roots.musicItems} {
      id
      title
      singer
      image {
        url
      }
    }
  }
`;

export async function getMusicItems(): Promise<MusicItem[]> {
  try {
    const data = await datoCMSClient.request<{ allMusicItems: RawMusicItem[] }>(
      GET_MUSIC_ITEMS
    );

    return (data?.allMusicItems ?? [])
      .map((item) => ({
      id: item.id,
      title: item.title,
      singer: item.singer,
      image: normalizeUrl(item.image?.url),
    }))
      .filter((item) => Boolean(item.image));
  } catch (error) {
    console.error('Error fetching music items from CMS:', error);
    throw error;
  }
}
