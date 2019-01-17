import { Moment } from 'moment';

export interface Project {
  name: string;
  subtitle: string;
  images: string[];
  description: string;
  googl_play_link?: string;
  steam_link?: string;
  apple_link?: string;
  url_link?: string;
  play_link?: string;
  created_at: Moment;
}
